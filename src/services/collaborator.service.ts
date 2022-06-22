import { hash } from "bcryptjs";
import { Request } from "express";
import { sign } from "jsonwebtoken";
import { Collaborators } from "../entities";
import { collaboratorRepositorie } from "../repositories";
import * as dotenv from "dotenv";
import {
  serializedCreateCollaboratorSchema,
  serializedUpdateCollaboratorSchema,
} from "../schemas";
import { RemovePassword } from "../utils";

dotenv.config();

class CollaboratorService {
  createCollaborator = async ({
    validatedBusiness,
  }: Request): Promise<Partial<Collaborators>> => {
    (validatedBusiness as Collaborators).password = await hash(
      (validatedBusiness as Collaborators).password,
      10
    );

    const collaborator = await collaboratorRepositorie.save(
      validatedBusiness as Collaborators
    );

    return await serializedCreateCollaboratorSchema.validate(collaborator, {
      stripUnknown: true,
    });
  };

  loginCollaborator = async ({ body }: Request) => {
    const collaborator = await collaboratorRepositorie.findOne({
      email: body.email,
    });

    if (!collaborator) {
      return {
        status: 400,
        message: { message: "Invalid credentials." },
      };
    }

    if (!(await collaborator.comparePwd(body.password))) {
      return {
        status: 400,
        message: { message: "Invalid credentials." },
      };
    }

    const token: string = sign(
      {
        collaboratorId: collaborator.collaboratorId,
        email: collaborator.email,
        isPaymaster: collaborator.isPaymaster,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: process.env.EXPIRES_IN,
      }
    );

    return { status: 200, message: { token } };
  };

  getAll = async () => {
    const collaborators = await collaboratorRepositorie.all();

    // return await serializedGetCollaboratorSchema.validate(collaborators, {
    //   stripUnknown: true,
    // });

    return collaborators;
  };

  retrieve = async ({ params }: Request) => {
    console.log(params);
    const collaborator = await collaboratorRepositorie.findOne({
      collaboratorId: params.id,
    });

    return collaborator;
  };

  updateCollaborator = async ({
    params,
    body,
  }: Request): Promise<Partial<Collaborators>> => {
    await collaboratorRepositorie.update(params.id, {
      ...body,
    });
    const collaborator = await collaboratorRepositorie.findOne({
      collaboratorId: params.id,
    });
    return await serializedUpdateCollaboratorSchema.validate(collaborator, {
      stripUnknown: true,
    });
  };
}

export default new CollaboratorService();

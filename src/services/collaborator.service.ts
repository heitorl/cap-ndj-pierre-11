import { hash } from "bcryptjs";
import { Request } from "express";
import { sign } from "jsonwebtoken";
import { Collaborators } from "../entities";
import { collaboratorRepositorie } from "../repositories";
import * as dotenv from "dotenv";
import { serializedCreateCollaboratorSchema } from "../schemas";

dotenv.config();

class CollaboratorService {
  createCollaborator = async ({
    validatedDatas: validatedBusiness,
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

    const token: string = sign({ ...collaborator }, process.env.SECRET_KEY, {
      expiresIn: process.env.EXPIRES_IN,
    });

    return { status: 200, message: { token } };
  };

  reads = async () => {
    const collaborators = await collaboratorRepositorie.find();

    return collaborators;
  };

  readById = async (id: string) => {
    const collaborator = await collaboratorRepositorie.findOne({
      collaboratorId: id
    });

    return collaborator;
  };
}

export default new CollaboratorService();

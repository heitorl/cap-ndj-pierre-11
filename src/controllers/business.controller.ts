import { Request, Response } from "express";
import { Business, Collaborators } from "../entities";
import { DatabaseError } from "pg";

import { BusinessService } from "../services";
import { RemovePassword, RemoveBusiness } from "../utils";
import { ErrorHandler } from "../errors";

class BusinessController {
  login = async (req: Request, res: Response) => {
    const token = await BusinessService.login(
      req.validatedDatas as Business
    );

    res.send({ token });
  };

  register = async (req: Request, res: Response) => {
    try {
      const business = await BusinessService.register(req.validatedDatas as Business);

      res.status(201).send({ business });
    } catch (err) {
      if (err instanceof DatabaseError) {
        return res.status(409).send({ error: err.detail });
      }
      res.status(400).send({ error: (err as Error).message });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const business = await BusinessService.update(
        req.businessToken.busineId,
        req.validatedDatas as Business
      );

      res.send({ business });
    } catch (err) {
      if (err instanceof DatabaseError) {
        return res.status(409).send({ error: err.detail });
      }
      res.status(400).send({ error: (err as Error).message });
    }
  };

  read = (req: Request, res: Response) => {
    res.send({ business: RemovePassword(req.businessToken) });
  };

  registerCollaborator = async (req: Request, res: Response) => {
    const collaborator = await BusinessService.registerCollaborator(req.collaborator, req.businessToken, req.validatedDatas as Collaborators);

    res.send({ collaborator: RemovePassword(collaborator) });
  };

  updateCollaborator = async (req: Request, res: Response) => {
    const collaborator = await BusinessService.updateCollaborator(req.collaborator, req.businessToken, req.validatedDatas as Collaborators);

    res.send({ collaborator: RemovePassword(collaborator) });
  };

  deleteCollaborator = async (req: Request, res: Response) => {
    await BusinessService.deleteCollaborator(req.collaborator, req.businessToken);

    res.send({});
  };


  readsCollaborators = async (req: Request, res: Response) => {
    const collaborators = await BusinessService.readsCollaborators(req.businessToken);

    res.send({ collaborators: collaborators.map(collaborator => RemovePassword(collaborator)) });
  };

  readCollaborator = async (req: Request, res: Response) => {
    const collaborator = await BusinessService.readsBusinessCollaborator(req.collaborator);
    if(collaborator || collaborator.busine.busineId !== req.businessToken.busineId){
      throw new ErrorHandler(404, "Collaborator is not registered");
    }

    res.send({ collaborator: RemoveBusiness(RemovePassword(collaborator)) });
  };
}

export default new BusinessController();

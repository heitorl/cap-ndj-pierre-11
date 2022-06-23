import { Request, Response } from "express";
import { collaboratorService } from "../services";

class CollaboratorController {
  createCollaborator = async (req: Request, res: Response) => {
    const collaborator = await collaboratorService.createCollaborator(req);

    return res.status(201).json(collaborator);
  };

  loginCollaborator = async (req: Request, res: Response) => {
    const { status, message } = await collaboratorService.loginCollaborator(
      req
    );

    return res.status(status).json(message);
  };

  getAll = async (_: Request, res: Response) => {
    const collaborators = await collaboratorService.getAll();

    return res.status(200).json(collaborators);
  };

  retriveve = async (req: Request, res: Response) => {
    const collaborator = await collaboratorService.retrieve(req);

    return res.status(200).json(collaborator);
  };

  updated = async (req: Request, res: Response) => {
    const collaborator = await collaboratorService.updateCollaborator(req);

    return res.status(200).json(collaborator);
  };

  testeController = (req: Request, res: Response) => {
    return res.status(200).json({ msg: "teste" });
  };
}

export default new CollaboratorController();

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

  reads = async (_: Request, res: Response) => {
    const collaborators = await collaboratorService.reads();

    res.send({
      collaborators: collaborators.map(collaborator => {
        const { password, isPaymaster, ...c } = collaborator;

        return c;
      })
    });
  };
}

export default new CollaboratorController();

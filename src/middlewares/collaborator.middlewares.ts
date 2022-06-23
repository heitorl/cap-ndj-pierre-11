import { Request, Response, NextFunction } from "express";

import { collaboratorService } from "../services";
import { ErrorHandler } from "../errors";


class CollaboratorMiddleware{
    verifyCollaboratorIfExist = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        const collaborator = await collaboratorService.readById(id);
        if(!collaborator){
            throw new ErrorHandler(404, "Transaction not found");
        }

        req.collaborator = collaborator;
        next();
    };
}


export default new CollaboratorMiddleware;

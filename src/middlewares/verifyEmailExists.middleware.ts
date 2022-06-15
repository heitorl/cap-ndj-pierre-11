import { NextFunction, Request, Response } from "express";
import { Collaborators } from "../entities";
import { ErrorHandler } from "../errors";
import { collaboratorRepositorie } from "../repositories";

const verifyEmailExists = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const foundEmail: Collaborators = await collaboratorRepositorie.findOne({
    email: req.body.email,
  });

  const foundCpf: Collaborators = await collaboratorRepositorie.findOne({
    cpf: req.body.cpf,
  });

  console.log(foundEmail);
  if (foundEmail) {
    throw new ErrorHandler(409, "Email already exists.");
  }

  if (foundCpf) {
    throw new ErrorHandler(409, "Cpf already exists.");
  }

  next();
};

export default verifyEmailExists;

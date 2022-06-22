import { Request, Response, NextFunction } from "express";
import { AnySchema, ValidationError } from "yup";
import verifyEmailExists from "./verifyEmailExists.middleware";
import BusinessMiddleware from "./business.middleware";
import verifyToken from "./verifyToken.middleware";
import collaboratorMiddlewares from "./collaborator.middlewares";
import { verify } from "jsonwebtoken";
import { Business } from "../entities";
import { BusinessService, collaboratorService } from "../services";


const validatedSchema =
  (schema: AnySchema) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        req.validatedDatas = await schema.validate(req.body, {
          abortEarly: false,
          stripUnknown: true,
        });

        next();
      } catch (err) {
        if (err instanceof ValidationError) {
          return res.status(400).send({ error: err.errors });
        }
      }
    };

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ error: "not authorized" });
  }

  await verify(token, process.env.SECRET_KEY ?? "", async (err, decode) => {
    if (err) {
      return res.status(401).send({ error: err.message, name: err.name });
    }

    const business = await BusinessService.readByEmail(
      (decode as Business).email
    );
    if (business) {
      req.UserToken = business;
      return next();
    }
    const collaborator = await collaboratorService.readByEmail((decode as Business).email);
    if (collaborator && collaborator.isPaymaster) {
      req.UserToken = collaborator;
      return next();
    }

    return res.status(401).send({ error: "not authorized" });
  });
};


export { validatedSchema, BusinessMiddleware, verifyEmailExists, verifyToken, collaboratorMiddlewares, validateToken };

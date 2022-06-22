import { Request, Response, NextFunction } from "express";
import { AnySchema, ValidationError } from "yup";
import verifyEmailExists from "./verifyEmailExists.middleware";
import BusinessMiddleware from "./business.middleware";
import verifyToken from "./verifyToken.middleware";
import collaboratorMiddlewares from "./collaborator.middlewares";


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

export { validatedSchema, BusinessMiddleware, verifyEmailExists, verifyToken, collaboratorMiddlewares };

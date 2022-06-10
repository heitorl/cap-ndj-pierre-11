import { Request, Response, NextFunction } from "express"
import { AnySchema, ValidationError } from "yup";

import BusinessMiddleware from "./business.middleware";


const validatedSchema = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try{
        req.validatedBusiness = await schema.validate(req.body, {
                abortEarly: false,
                stripUnknown: true,
            });

        next();
    }
    catch (err){
        if(err instanceof ValidationError){
            return res.status(400).send({ "error": err.errors });
        }
    }
};


export {
    validatedSchema,
    BusinessMiddleware,
};

import { Request, Response, NextFunction } from "express";
import { verify, VerifyErrors, JwtPayload } from "jsonwebtoken";
import { ErrorHandler } from "../errors";
import * as dotenv from "dotenv";
import { Collaborators } from "../entities";

dotenv.config();

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token: string = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new ErrorHandler(401, "Missing authorization token.");
  }

  return verify(
    token,
    process.env.SECRET_KEY,
    (err: VerifyErrors, decoded: string | JwtPayload) => {
      if (err) {
        return res.status(401).json({
          error: { name: "JsonWebTokenError", message: "jwt malformed" },
        });
      }

      req.decoded = decoded as Collaborators;

      next();
    }
  );
};

export default verifyToken;

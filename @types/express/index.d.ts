import { bankData, Business, Collaborators } from "../../src/entities";
declare global {
  namespace Express {
    interface Request {
      validatedBusiness: Partial<Business> | Collaborators;
      decoded: Collaborators;
    }
  }
}

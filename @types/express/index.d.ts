import { bankData, Business, Collaborators } from "../../src/entities";
declare global {
  namespace Express {
    interface Request {
      validatedDatas: Partial<Business | Collaborators>;
      businessToken: Business;
      decoded: Collaborators;
      collaborator: Collaborators
    }
  }
}

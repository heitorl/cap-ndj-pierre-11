import { bankData, Business, Collaborators, Transactions } from "../../src/entities";
declare global {
  namespace Express {
    interface Request {
      validatedDatas: Partial<Business | Collaborators | Transactions>;
      businessToken: Business;
      decoded: Collaborators;
      collaborator: Collaborators;
      UserToken: Business | Collaborators;
    }
  }
}

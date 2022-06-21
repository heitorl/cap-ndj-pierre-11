import {
  Business,
  Payments,
  bankData,
  Collaborators,
} from "../../src/entities";

declare global {
  namespace Express {
    interface Request {
      validatedBusiness: Partial<Business | Collaborators>;
      businessToken: Business;
      validatedPayment: Partial<Payments>;
      decoded: Collaborators;
    }
  }
}

import { Business, Payments } from "../../src/entities";

declare global {
  namespace Express {
    interface Request {
      validatedBusiness: Partial<Business>;
      validatedPayment: Partial<Payments>;
    }
  }
}

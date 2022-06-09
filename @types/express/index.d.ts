import { Business } from "../../src/entities";


declare global {
    namespace Express{
        interface Request{
            validatedBusiness: Partial<Business>;
        }
    }
}

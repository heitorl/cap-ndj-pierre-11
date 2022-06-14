import jwt from "jsonwebtoken";
import { compare, hash } from "bcrypt";

import { AppDataSource } from "../data-source";
import { Business } from "../entities";
import { RemovePassword } from "../utils";


class BusinessService {
    login = async (datas: Partial<Business>): Promise<string> => {
        const repository = AppDataSource.getRepository(Business);
        const business = await repository.findOneBy({ email: (datas.email as string) });

        return jwt.sign({ email: business.email }, process.env.SECRET_KEY, { expiresIn: process.env.EXPIRES_IN });
    };
    register = async (datas: Partial<Business>): Promise<Partial<Business>> => {
        const repository = AppDataSource.getRepository(Business);
        datas.password = await hash((datas.password as string), parseInt(process.env.HASH_LENGTH));
        const business = await repository.save({ ...datas, isAdmin: true });

        return RemovePassword(business);
    }
    readByEmail = async (email: string): Promise<Business> => {
        const repository = AppDataSource.getRepository(Business);
        return await repository.findOneBy({ email: email });
    };

    
    verifyLogin = async (datas: Partial<Business>): Promise<boolean> => {
        const repository = AppDataSource.getRepository(Business);
        const business = await repository.findOneBy({ email: (datas.email as string) });

        if(!business) {
            return false;
        }
        
        return await compare(datas.password, business.password);
    };
}


export default new BusinessService;

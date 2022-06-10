import jwt from "jsonwebtoken";
import { compare } from "bcrypt";

import { AppDataSource } from "../data-source";
import { Business } from "../entities";


class BusinessService {
    login = async (datas: Partial<Business>): Promise<string> => {
        const repository = AppDataSource.getRepository(Business);
        const user = await repository.findOneBy({ email: (datas.email as string) });

        return jwt.sign({ email: user.email }, process.env.SECRET_KEY, { expiresIn: process.env.EXPIRES_IN });
    };

    verifyLogin = async (datas: Partial<Business>): Promise<boolean> => {
        const repository = AppDataSource.getRepository(Business);
        const user = await repository.findOneBy({ email: (datas.email as string) });

        if(!user) {
            return false;
        }
        
        return await compare(datas.password, user.password);
    };
}


export default new BusinessService;

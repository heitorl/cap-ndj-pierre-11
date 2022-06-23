import jwt from "jsonwebtoken";
import { compare, hash } from "bcryptjs";

import { AppDataSource } from "../data-source";
import { Business, Collaborators } from "../entities";
import { RemovePassword } from "../utils";
import { ErrorHandler } from "../errors";

class BusinessService {
    login = async (datas: Partial<Business>): Promise<string> => {
        const repository = AppDataSource.getRepository(Business);
        const business = await repository.findOneBy({
            email: datas.email as string,
        });

        return jwt.sign({ email: business.email }, process.env.SECRET_KEY, {
            expiresIn: process.env.EXPIRES_IN,
        });
    };

    register = async (datas: Partial<Business>): Promise<Partial<Business>> => {
        const repository = AppDataSource.getRepository(Business);
        datas.password = await hash(
            datas.password as string,
            parseInt(process.env.HASH_LENGTH)
        );
        const business = await repository.save({ ...datas, isAdmin: true });

        return RemovePassword(business);
    };

    update = async (id: string, payload: Partial<Business>) => {
        const repository = AppDataSource.getRepository(Business);
        if (payload.password) {
            payload.password = await hash(
                payload.password as string,
                parseInt(process.env.HASH_LENGTH)
            );
        }

        await repository.update(id, { ...payload });
        const business = await repository.findOneBy({ busineId: id });

        return RemovePassword(business);
    };

    registerCollaborator = async (collaborator: Collaborators, business: Business, datas: Partial<Collaborators>) => {
        const repositoryCollaborator = AppDataSource.getRepository(Collaborators);

        const collaboratorDb = await repositoryCollaborator.createQueryBuilder("collaborators")
            .innerJoinAndSelect("collaborators.busine", "business").where({ collaboratorId: collaborator.collaboratorId }).getOne();
        if (collaboratorDb?.busine) {
            throw new ErrorHandler(409, "Collaborator is already registered");
        }

        await repositoryCollaborator.update(collaborator.collaboratorId, { isPaymaster: datas.isPaymaster, busine: business });
        return await repositoryCollaborator.findOneBy({ collaboratorId: collaborator.collaboratorId });
    };

    updateCollaborator = async (collaborator: Collaborators, business: Business, datas: Partial<Collaborators>) => {
        const repositoryCollaborator = AppDataSource.getRepository(Collaborators);

        const collaboratorDb = await repositoryCollaborator.createQueryBuilder("collaborators")
            .innerJoinAndSelect("collaborators.busine", "business").where({ collaboratorId: collaborator.collaboratorId }).getOne();
        if (!collaboratorDb?.busine || collaborator.busine.busineId !== business.busineId) {
            throw new ErrorHandler(404, "Collaborator is not registered");
        }

        await repositoryCollaborator.update(collaborator.collaboratorId, { isPaymaster: datas.isPaymaster });
        return await repositoryCollaborator.findOneBy({ collaboratorId: collaborator.collaboratorId });
    };

    deleteCollaborator = async (collaborator: Collaborators, business: Business) => {
        const repositoryCollaborator = AppDataSource.getRepository(Collaborators);

        const collaboratorDb = await repositoryCollaborator.createQueryBuilder("collaborators")
            .innerJoinAndSelect("collaborators.busine", "business").where({ collaboratorId: collaborator.collaboratorId }).getOne();
        if (!collaboratorDb?.busine || collaborator.busine.busineId !== business.busineId) {
            throw new ErrorHandler(404, "Collaborator is not registered");
        }

        await repositoryCollaborator.update(collaborator.collaboratorId, { isPaymaster: false, busine: null });
    };

    readsCollaborators = async (business: Business) => {
        const repository = AppDataSource.getRepository(Business);
        const businessDb = await repository.createQueryBuilder("business")
            .innerJoinAndSelect("business.collaborators", "collaborators").where({ busineId: business.busineId }).getOne();
        
        return businessDb?.collaborators? businessDb.collaborators: [];
    };

    readsBusinessCollaborator = async (collaborator: Collaborators) => {
        const repository = AppDataSource.getRepository(Collaborators);
        const collaboratorDb = await repository.createQueryBuilder("collaborators")
            .innerJoinAndSelect("collaborators.busine", "business").where({ collaboratorId: collaborator.collaboratorId }).getOne();
        
        return collaboratorDb
    };


    readByEmail = async (email: string): Promise<Business> => {
        const repository = AppDataSource.getRepository(Business);
        return await repository.findOneBy({ email: email });
    };
    verifyLogin = async (datas: Partial<Business>): Promise<boolean> => {
        const repository = AppDataSource.getRepository(Business);
        const business = await repository.findOneBy({
            email: datas.email as string,
        });

        if (!business) {
            return false;
        }

        return await compare(datas.password, business.password);
    };
}

export default new BusinessService();

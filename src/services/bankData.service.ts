import { Request } from "express";
import { bankData, Collaborators } from "../entities";
import { collaboratorRepositorie } from "../repositories";
import bankDataRepositorie from "../repositories/bankData.repositorie";
import { serializedCreateBankDataSchema } from "../schemas/bankData.schema";

class BankDataService {
  createBankData = async ({ validatedDatas: validatedBusiness, decoded }: Request) => {
    const collaborator: Collaborators = await collaboratorRepositorie.findOne({
      collaboratorId: decoded.collaboratorId,
    });

    console.log(collaborator);
    const bankData: bankData = await bankDataRepositorie.save({
      ...(validatedBusiness as bankData),
      collaborator,
    });

    return await serializedCreateBankDataSchema.validate(bankData, {
      stripUnknown: true,
    });
  };
}

export default new BankDataService();

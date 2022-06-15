import { Request } from "express";
import { bankData, Collaborators } from "../entities";
import { collaboratorRepositorie } from "../repositories";
import bankDataRepositorie from "../repositories/bankData.repositorie";
import { serializedCreateBankDataSchema } from "../schemas/bankData.schema";

class BankData {
  createBankData = async ({ validatedBusiness, decoded }: Request) => {
    const collaborator: Collaborators = await collaboratorRepositorie.findOne({
      collaboratorId: decoded.collaboratorId,
    });

    const bankaData = await bankDataRepositorie.save({
      ...(validatedBusiness as bankData),
      collaborator,
    });

    console.log(collaborator.bankData);

    return await serializedCreateBankDataSchema.validate(bankaData, {
      stripUnknown: true,
    });
  };
}

export default new BankData();

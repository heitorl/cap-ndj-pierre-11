import { Business, Collaborators, Transactions, Payments, Discounts } from "../entities";
import { AppDataSource } from "../data-source";


class PaymentService {
  createPayment = async (datas: Partial<Payments>, transactions: Transactions, user: Business | Collaborators) => {
    const repository = AppDataSource.getRepository(Payments);
    const repositoryDiscount = AppDataSource.getRepository(Discounts);

    if(datas.discount){
      for(let x = 0; x < datas.discount.length; x++){
        datas.discount[x] = await repositoryDiscount.save({ ...datas.discount[x] })
      }
    }
    if(user instanceof Collaborators){
      return await repository.save({ ...datas, collaborator: user, transaction: transactions });
    }

    return await repository.save({ ...datas, transaction: transactions });
  };
}

export default new PaymentService();

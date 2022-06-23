import {
  Business,
  Collaborators,
  Transactions,
  Payments,
  Discounts,
} from "../entities";
import { AppDataSource } from "../data-source";

class PaymentService {
  createPayment = async (
    datas: Partial<Payments>,
    transactions: Transactions,
    user: Business | Collaborators
  ) => {
    const repository = AppDataSource.getRepository(Payments);
    const repositoryDiscount = AppDataSource.getRepository(Discounts);

    datas.liquidValue = transactions.value;
    datas.brut_value = transactions.value;

    if (datas.discount) {
      datas.discount.forEach(async (discount) => {
        if (datas.liquidValue > 1000 && datas.liquidValue - discount.value) {
          datas.liquidValue = datas.liquidValue - discount.value;
          discount = await repositoryDiscount.save({ ...discount });
        }
      });
    }

    if (user instanceof Collaborators) {
      return await repository.save({
        ...datas,
        collaborator: user,
        transaction: transactions,
      });
    }

    return await repository.save({ ...datas, transaction: transactions });
  };
}

export default new PaymentService();

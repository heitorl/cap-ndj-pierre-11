import { Repository, UpdateResult } from "typeorm";
import { AppDataSource } from "../data-source";
import { Payments } from "../entities";

interface IPaymentRepo {
  save: (payment: Partial<Payments>) => Promise<Payments>;
  all: () => Promise<Payments[]>;
  findOne: (payload: object) => Promise<Payments>;
  update: (id: string, payload: Partial<Payments>) => Promise<UpdateResult>;
}

class PaymentRepo implements IPaymentRepo {
  private repo: Repository<Payments>;

  constructor() {
    this.repo = AppDataSource.getRepository(Payments);
  }

  save = async (payment: Partial<Payments>) => await this.repo.save(payment);

  all = async () => await this.repo.find();

  findOne = async (payload: object) => {
    return await this.repo.findOneBy({ ...payload });
  };

  update = async (
    id: string,
    payload: Partial<Payments>
  ): Promise<UpdateResult> => await this.update(id, { ...payload });
}

export default new PaymentRepo();

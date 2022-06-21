import { Repository, UpdateResult } from "typeorm";
import { AppDataSource } from "../data-source";
import { Discounts } from "../entities";

interface IDiscountRepo {
  save: (payment: Partial<Discounts>) => Promise<Discounts>;
  all: () => Promise<Discounts[]>;
  findOne: (payload: object) => Promise<Discounts>;
  update: (id: string, payload: Partial<Discounts>) => Promise<UpdateResult>;
}

class DiscountRepo implements IDiscountRepo {
  private repo: Repository<Discounts>;

  constructor() {
    this.repo = AppDataSource.getRepository(Discounts);
  }

  save = async (discount: Partial<Discounts>) => await this.repo.save(discount);

  all = async () => await this.repo.find();

  findOne = async (payload: object) => {
    return await this.repo.findOneBy({ ...payload });
  };

  update = async (
    id: string,
    payload: Partial<Discounts>
  ): Promise<UpdateResult> => await this.update(id, { ...payload });
}

export default new DiscountRepo();

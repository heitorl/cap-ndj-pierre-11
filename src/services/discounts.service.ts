import { Request } from "express";
import { Discounts } from "../entities";
import { discountRepository } from "../repositories";

class DiscountService {
  create = async ({ body }: Request) => {
    const newDiscount: Partial<Discounts> = {
      value: body.value,
      type: body.type,
    };

    const discount = discountRepository.save(newDiscount);

    return discount;
  };

  listAll = async () => {
    const discountList = await discountRepository.all();

    return discountList;
  };

  listOne = async ({ params }: Request) => {
    const discountOne = await discountRepository.findOne({
      discountId: params.id,
    });

    return discountOne;
  };

  update = async ({ body, params }: Request) => {
    const discountUpdate = await discountRepository.update(params.id, {
      ...body,
    });

    const discountUpdated = await discountRepository.findOne({
      discountId: params.id,
    });

    return discountUpdated;
  };

  delete = async ({ params }: Request) => {
    const discountDeleted = await discountRepository.delete(params.id);

    return discountDeleted;
  };
}

export default new DiscountService();

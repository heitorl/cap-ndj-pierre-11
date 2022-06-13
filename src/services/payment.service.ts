import { Request } from "express";
import { Payments } from "../entities";
import { paymentRepository } from "../repositories";
class PaymentService {
  createPayment = async ({ validatedPayment }: Request) => {
    //TODO: Build createPayment function
    const newPayment = {
      // brut_value: validatedPayment.brut_value,
      // liquidValue: validatedPayment.liquidValue,
      // dateEmission: new Date(),
    };

    const payment = paymentRepository.save(newPayment);

    return payment;
  };

  listAll = async ({ body }: Request) => {
    const paymentList = await paymentRepository.all();

    return paymentList;
  };

  listOne = async ({ body, params }: Request) => {
    const paymentOne = await paymentRepository.findOne({ ...params });

    return paymentOne;
  };

  update = async ({ validatedPayment, params }: Request) => {
    const paymentUpdate = await paymentRepository.update(params.id, {
      ...(validatedPayment as Payments),
    });

    const paymentUpdated = await paymentRepository.findOne({
      paymentId: params.id,
    });

    return paymentUpdated;
  };
}

export default new PaymentService();

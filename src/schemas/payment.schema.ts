import * as yup from "yup";


const DiscountsSchema = yup.object().shape({
    value: yup.number().positive().required(),
    type: yup.string().required()
});

const RegisterPaymentSchema = yup.object().shape({
    discounts: yup.array().of(DiscountsSchema),
});


export{
    RegisterPaymentSchema,
};

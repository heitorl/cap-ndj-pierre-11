import * as yup from "yup";


const RegisterTransactionSchema = yup.object().shape({
    value: yup.number().positive().required(),
    description: yup.string().required(),
    type: yup.string().required(),
});


export {
    RegisterTransactionSchema,
}
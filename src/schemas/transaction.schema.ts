import * as yup from "yup";


const RegisterTransactionSchema = yup.object().shape({
    value: yup.number().positive().required(),
    description: yup.string().optional(),
    type: yup.string().required(),
});


export {
    RegisterTransactionSchema,
}
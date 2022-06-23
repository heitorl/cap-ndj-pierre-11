import * as yup from "yup";


const LoginBusinessSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});

const RegisterBusinessSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().lowercase().email().required(),
    password: yup.string().required(),
    cnpj: yup.string().matches(/^[0-9]{14}$/, "cnpj is invalid").required(),
});

const UpdateBusinessSchema = yup.object().shape({
    name: yup.string(),
    email: yup.string().lowercase().email(),
    password: yup.string(),
});

const RegisterCollaboratorSchema = yup.object().shape({
    isPaymaster: yup.boolean().default(false).optional(),
});


export {
    LoginBusinessSchema,
    RegisterBusinessSchema,
    UpdateBusinessSchema,
    RegisterCollaboratorSchema
};

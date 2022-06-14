import * as yup from "yup";


const LoginBusinessSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});

const RegisterBusinessSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().lowercase().email().required(),
    password: yup.string().required(),
    cnpj: yup.string().matches(/^[0-9]{14}$/, "xx.xxx.xxx/xxxx-xx").required(),
});

const UpdateBusinessSchema = yup.object().shape({
    name: yup.string(),
    email: yup.string().lowercase().email(),
    password: yup.string(),
});


export {
    LoginBusinessSchema,
    RegisterBusinessSchema,
    UpdateBusinessSchema,
};

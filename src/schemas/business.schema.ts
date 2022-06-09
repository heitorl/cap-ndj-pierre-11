import * as yup from "yup";


const LoginBusinessSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});


export {
    LoginBusinessSchema,
};

import * as yup from "yup";

const loginCollaboratorSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default loginCollaboratorSchema;

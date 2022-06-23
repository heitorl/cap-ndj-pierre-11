import * as yup from "yup";

const serializedUpdateCollaboratorSchema = yup.object().shape({
  collaboratorId: yup.string().uuid().required(),
  name: yup.string().required(),
  email: yup.string().email().required(),
  contact: yup.string().required(),
  cpf: yup.string().required(),
  isPaymaster: yup.boolean().required(),
});

export { serializedUpdateCollaboratorSchema };

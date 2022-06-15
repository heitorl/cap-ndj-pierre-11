import * as yup from "yup";

const createCollaboratorSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().lowercase().required(),
  password: yup.string().required(),
  contact: yup.string().required(),
  cpf: yup.string().required(),
  isPaymaster: yup.boolean().default(false).optional(),
});

const serializedCreateCollaboratorSchema = yup.object().shape({
  collaboratorId: yup.string().uuid().required(),
  name: yup.string().required(),
  email: yup.string().email().required(),
  contact: yup.string().required(),
  cpf: yup.string().required(),
  isPaymaster: yup.boolean().required(),
});

export { createCollaboratorSchema, serializedCreateCollaboratorSchema };

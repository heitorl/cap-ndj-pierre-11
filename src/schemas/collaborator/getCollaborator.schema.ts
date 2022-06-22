import * as yup from "yup";

const serializedGetCollaboratorSchema = yup.object().shape({
  collaboratorId: yup.string().uuid().required(),
  name: yup.string().required(),
  email: yup.string().email().required(),
  contact: yup.string().required(),
  cpf: yup.string().required(),
  isPaymaster: yup.boolean().required(),
  bankData: yup
    .object()
    .shape({
      bankDataId: yup.string().uuid(),
      pix: yup.string(),
      agencia: yup.string(),
      conta: yup.string(),
      banco: yup.string(),
    })
    .notRequired(),
  // payments: yup.array(),
});

export default serializedGetCollaboratorSchema;

import * as yup from "yup";

const createBankDatachema = yup.object().shape({
  pix: yup.string().required(),
  agencia: yup.string().required(),
  conta: yup.string().required(),
  banco: yup.string().required(),
});

const serializedCreateBankDataSchema = yup.object().shape({
  bankDataId: yup.string().uuid().required(),
  pix: yup.string().required(),
  agencia: yup.string().required(),
  conta: yup.string().required(),
  banco: yup.string().required(),
  collaborator: yup.object().shape({
    collaboratorId: yup.string().uuid().required(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    contact: yup.string().required(),
    cpf: yup.string().required(),
    isPaymaster: yup.boolean().required(),
  }),
});

export { createBankDatachema, serializedCreateBankDataSchema };

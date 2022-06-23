import {
  createCollaboratorSchema,
  serializedCreateCollaboratorSchema,
  loginCollaboratorSchema,
} from "./collaborator";

import * as yup from "yup";

import {
  LoginBusinessSchema,
  RegisterBusinessSchema,
  UpdateBusinessSchema,
  RegisterCollaboratorSchema
} from "./business.schema";
import { RegisterTransactionSchema } from "./transaction.schema";

import { RegisterPaymentSchema } from "./payment.schema";


const CheckIdSchema = yup.object().shape({
  id: yup.string().uuid().required(),
});

export {
  LoginBusinessSchema,
  RegisterBusinessSchema,
  UpdateBusinessSchema,
  CheckIdSchema,
  createCollaboratorSchema,
  serializedCreateCollaboratorSchema,
  loginCollaboratorSchema,
  RegisterCollaboratorSchema,
  RegisterTransactionSchema,
  RegisterPaymentSchema,
};

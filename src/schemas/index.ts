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
} from "./business.schema";

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
};

import { Business, Collaborators } from "../entities";

const RemovePassword = (datas: Partial<Business | Collaborators>) => {
  const { password, ...user } = datas;

  return user;
};

const RemoveBusiness = (datas: Partial<Collaborators>) => {
  const { busine, ...user } = datas;

  return user;
};

export { RemovePassword, RemoveBusiness };

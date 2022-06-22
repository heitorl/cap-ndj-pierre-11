import { Business, Collaborators } from "../entities";

const RemovePassword = (datas: Partial<Business | Collaborators>) => {
  const { password, ...user } = datas;

  return user;
};

export { RemovePassword };

import { Business, Collaborators, Transactions, } from "../entities";


const RemovePassword = (datas: Partial<Business | Collaborators>) => {
  const { password, ...user } = datas;

  return user;
};

const RemoveBusiness = (datas: Partial<Collaborators>) => {
  const { busine, ...user } = datas;

  return user;
};

const RemoveUsers = (datas: Transactions) => {
    const { busine, collaborator, ...transactions } = datas;

    return transactions;
}


export {
    RemovePassword,
    RemoveBusiness,
    RemoveUsers,
};

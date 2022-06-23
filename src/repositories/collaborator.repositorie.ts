import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Collaborators } from "../entities";

interface ICollaboratorRepo {
  save: (collaborator: Partial<Collaborators>) => Promise<Collaborators>;
  all: () => Promise<Collaborators[]>;
  findOne: (payload: object) => Promise<Collaborators>;
}

class CollaboratorRepo implements ICollaboratorRepo {
  private repo: Repository<Collaborators>;

  constructor() {
    this.repo = AppDataSource.getRepository(Collaborators);
  }

  save = async (collaborator: Partial<Collaborators>) =>
    await this.repo.save(collaborator);

  all = async () => await this.repo.find();

  findOne = async (payload: object) => {
    return await this.repo.findOneBy({ ...payload });
  };

  find = async () => await this.repo.find();
}

export default new CollaboratorRepo();

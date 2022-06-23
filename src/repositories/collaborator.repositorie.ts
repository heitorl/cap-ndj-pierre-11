import { Repository, UpdateResult, DeleteResult } from "typeorm";
import { AppDataSource } from "../data-source";
import { Collaborators } from "../entities";
import { hash } from "bcryptjs";

interface ICollaboratorRepo {
  save: (collaborator: Partial<Collaborators>) => Promise<Collaborators>;
  all: () => Promise<Collaborators[]>;
  findOne: (payload: object) => Promise<Collaborators>;
  update: (
    id: string,
    payload: Partial<Collaborators>
  ) => Promise<UpdateResult>;
  delete: (id: string) => Promise<DeleteResult>;
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

  update = async (id: string, payload: Partial<Collaborators>) => {
    if (payload.password) {
      payload.password = await hash(payload.password, 10);
    }

    return await this.repo.update(id, { ...payload });
  };

  delete = async (id: string) => await this.repo.delete(id);
}

export default new CollaboratorRepo();

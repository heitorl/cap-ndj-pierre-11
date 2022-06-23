import supertest from "supertest";
import { Connection } from "..";
import app from "../../app";
import { Collaborators } from "../../entities";

describe("create collaborator route | Integration test", () => {
  const dbConnection = new Connection();

  beforeAll(async () => {
    await dbConnection.create();
  });

  afterAll(async () => {
    await dbConnection.clear();
    await dbConnection.close();
  });

  afterEach(async () => {
    await dbConnection.clear();
  });

  it("Return: Collaborator as JSON response | Status code: 201", async () => {
    const collaborator: Partial<Collaborators> = {
      name: "test",
      email: "email@test.com",
      password: "1234",
      contact: "219992819202",
      cpf: "281829102100",
    };

    const response = await supertest(app)
      .post("/api/collaborators/register")
      .send({ ...collaborator });

    console.log(response);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("email");
    expect(response.body.email).toStrictEqual(collaborator.email);
    //   expect(validate (response.body.userUuid)).toBeTruthy();
  });
});

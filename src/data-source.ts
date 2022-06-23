import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,

  synchronize: false,
  logging: false,
  entities:
    process.env.NODE_ENV === "production"
      ? ["build/entities/*.js"]
      : [path.join(__dirname, "/entities/**/*.{ts,js}")],
  migrations:
    process.env.NODE_ENV === "production"
      ? ["build/migrations/*.js"]
      : [path.join(__dirname, "/migrations/**/*.{ts,js}")],
});

const TestEnv = new DataSource({
  type: "sqlite",
  database: "../dbTest.sqlite",
  synchronize: true,
  entities: [path.join(__dirname, "./entities/**/*.{js,ts}")],
});


export default process.env.NODE_ENV === "test" ? TestEnv : AppDataSource;

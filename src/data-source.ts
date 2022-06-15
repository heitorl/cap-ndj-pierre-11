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
  logging: true,
  entities: [path.join(__dirname, "/entities/**/*.{ts,js}")],
  migrations: [path.join(__dirname, "/migrations/**/*.{ts,js}")],
});

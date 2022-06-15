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
  entities:
    process.env.NODE_ENV === "production"
      ? ["dist/entities/*.js"]
      : [path.join(__dirname, "/entities/**/*.{ts,js}")],
  migrations:
    process.env.NODE_ENV === "production"
      ? ["dist/migrations/*.js"]
      : [path.join(__dirname, "/migrations/**/*.{ts,js}")],
});

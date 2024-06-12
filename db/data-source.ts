import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "admin",
  password: "admin",
  database: "postgres",
  entities: ["dist/**/*.entity.js"],
  migrations: ["dist/db/migrations/*.js"],
  synchronize: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: "postgres",
  entities: ["dist/**/*.entity.js"],
  migrations: ["dist/db/migrations/*.js"],
  //synchronize: true,   /*quando for sincronizar com o banco*/
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

import * as dotenv from "dotenv";
dotenv.config();

import mysql from "mysql";

export const db = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

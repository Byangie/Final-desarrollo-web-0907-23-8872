import "dotenv/config";
import { Sequelize, DataTypes } from "sequelize";

import crearUsuario from "./usuario.js";
import crearEquipo from "./equipo.js";
import crearIncidencia from "./incidencia.js";

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: "postgres",
    logging: false
  }
);

export const Usuario = crearUsuario(sequelize, DataTypes);
export const Equipo = crearEquipo(sequelize, DataTypes);
export const Incidencia = crearIncidencia(sequelize, DataTypes);

const models = {
  Usuario,
  Equipo,
  Incidencia
};

for (const modelo of Object.values(models)) {
  if (typeof modelo.associate === "function") {
    modelo.associate(models);
  }
}

export default {
  sequelize,
  ...models
};
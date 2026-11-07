import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Equipo extends Model {}

  Equipo.init(
    {
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      codigo: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
      }
    },
    {
      sequelize,
      modelName: "Equipo",
      tableName: "equipos",
      timestamps: false
    }
  );

  return Equipo;
};
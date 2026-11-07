import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Incidencia extends Model {
    static associate(models) {
      Incidencia.belongsTo(models.Usuario, {
        foreignKey: "usuario_id",
        as: "usuario"
      });

      Incidencia.belongsTo(models.Equipo, {
        foreignKey: "equipo_id",
        as: "equipo"
      });
    }
  }

  Incidencia.init(
    {
      equipo_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      estado: {
        type: DataTypes.ENUM("abierta", "cerrada"),
        allowNull: false,
        defaultValue: "abierta"
      }
    },
    {
      sequelize,
      modelName: "Incidencia",
      tableName: "incidencias",
      timestamps: false
    }
  );

  return Incidencia;
};
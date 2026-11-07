import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Usuario extends Model {}

  Usuario.init(
    {
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true
      },
      password_hash: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      rol: {
        type: DataTypes.ENUM("usuario", "tecnico"),
        allowNull: false,
        defaultValue: "usuario"
      }
    },
    {
      sequelize,
      modelName: "Usuario",
      tableName: "usuarios",
      timestamps: false
    }
  );

  return Usuario;
};
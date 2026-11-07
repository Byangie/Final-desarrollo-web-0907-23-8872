"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("usuarios", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },

      nombre: {
        type: Sequelize.STRING(100),
        allowNull: false
      },

      email: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true
      },

      password_hash: {
        type: Sequelize.STRING(255),
        allowNull: false
      },

      rol: {
        type: Sequelize.ENUM("usuario", "tecnico"),
        allowNull: false,
        defaultValue: "usuario"
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("usuarios");
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_usuarios_rol";'
    );
  }
};
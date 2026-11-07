"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("incidencias", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },

      equipo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "equipos",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT"
      },

      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "usuarios",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT"
      },

      descripcion: {
        type: Sequelize.TEXT,
        allowNull: false
      },

      estado: {
        type: Sequelize.ENUM("abierta", "cerrada"),
        allowNull: false,
        defaultValue: "abierta"
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("incidencias");
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_incidencias_estado";'
    );
  }
};
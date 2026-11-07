import bcrypt from "bcryptjs";
import { sequelize, Usuario, Equipo } from "../models/index.js";

async function crearDatosPrueba() {
  try {
    await sequelize.authenticate();

    const usuarios = [
      {
        nombre: "Usuario Prueba",
        email: "usuario@lab.test",
        password: "Usuario123!",
        rol: "usuario"
      },
      {
        nombre: "Tecnico Prueba",
        email: "tecnico@lab.test",
        password: "Tecnico123!",
        rol: "tecnico"
      },
      {
        nombre: "Segundo Usuario",
        email: "usuario2@lab.test",
        password: "Usuario123!",
        rol: "usuario"
      }
    ];

    for (const usuario of usuarios) {
      const password_hash = await bcrypt.hash(usuario.password, 10);

      await Usuario.findOrCreate({
        where: { email: usuario.email },
        defaults: {
          nombre: usuario.nombre,
          email: usuario.email,
          password_hash,
          rol: usuario.rol
        }
      });
    }

    const equipos = [
      { nombre: "Computadora Dell", codigo: "PC-001" },
      { nombre: "Computadora HP", codigo: "PC-002" },
      { nombre: "Impresora Epson", codigo: "IMP-001" }
    ];

    for (const equipo of equipos) {
      await Equipo.findOrCreate({
        where: { codigo: equipo.codigo },
        defaults: equipo
      });
    }

    console.log("Usuarios y equipos de prueba preparados");
  } catch (error) {
    console.error("Error al crear datos:", error);
  } finally {
    await sequelize.close();
  }
}

crearDatosPrueba();
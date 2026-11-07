import { Router } from "express";
import bcrypt from "bcryptjs";
import { Usuario } from "../../models/index.js";

const router = Router();

// Iniciar sesión
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        mensaje: "Correo y contraseña son obligatorios"
      });
    }

    const usuario = await Usuario.findOne({
      where: { email: email.trim().toLowerCase() }
    });

    if (!usuario) {
      return res.status(401).json({
        mensaje: "Credenciales incorrectas"
      });
    }

    const passwordValida = await bcrypt.compare(
      password,
      usuario.password_hash
    );

    if (!passwordValida) {
      return res.status(401).json({
        mensaje: "Credenciales incorrectas"
      });
    }

    // Renovar la sesión para evitar fijación de sesión
    req.session.regenerate((error) => {
      if (error) {
        return res.status(500).json({
          mensaje: "Error al iniciar sesión"
        });
      }

      req.session.usuario = {
        id: usuario.id,
        nombre: usuario.nombre,
        rol: usuario.rol
      };

      req.session.save((error) => {
        if (error) {
          return res.status(500).json({
            mensaje: "Error al guardar la sesión"
          });
        }

        return res.json({
          mensaje: "Inicio de sesión exitoso",
          usuario: req.session.usuario
        });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error interno del servidor"
    });
  }
});

// Consultar la sesión actual
router.get("/me", (req, res) => {
  if (!req.session.usuario) {
    return res.status(401).json({
      mensaje: "No autenticado"
    });
  }

  res.json({
    usuario: req.session.usuario
  });
});

// Cerrar sesión
router.post("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({
        mensaje: "Error al cerrar sesión"
      });
    }

    res.clearCookie("lab.sid", { path: "/" });

    res.json({
      mensaje: "Sesión cerrada correctamente"
    });
  });
});

export default router;
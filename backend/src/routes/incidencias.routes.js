import { Router } from "express";
import { Equipo, Incidencia, Usuario } from "../../models/index.js";
import { requiereAutenticacion } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(requiereAutenticacion);

router.get("/", async (req, res) => {
  try {
    const incidencias = await Incidencia.findAll({
      include: [
        {
          model: Equipo,
          as: "equipo",
          attributes: ["id", "nombre", "codigo"]
        },
        {
          model: Usuario,
          as: "usuario",
          attributes: ["id", "nombre"]
        }
      ],
      order: [["id", "DESC"]]
    });

    res.json(incidencias);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al obtener las incidencias"
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { equipo_id, descripcion } = req.body;

    if (
      !Number.isInteger(Number(equipo_id)) ||
      Number(equipo_id) <= 0 ||
      typeof descripcion !== "string" ||
      descripcion.trim().length < 5
    ) {
      return res.status(400).json({
        mensaje: "Selecciona un equipo y escribe una descripción de al menos 5 caracteres"
      });
    }

    const equipo = await Equipo.findByPk(equipo_id);

    if (!equipo) {
      return res.status(404).json({
        mensaje: "El equipo seleccionado no existe"
      });
    }

    const incidencia = await Incidencia.create({
      equipo_id: equipo.id,
      usuario_id: req.session.usuario.id,
      descripcion: descripcion.trim(),
      estado: "abierta"
    });

    res.status(201).json({
      mensaje: "Incidencia registrada correctamente",
      incidencia
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al registrar la incidencia"
    });
  }
});

router.patch("/:id/cerrar", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        mensaje: "ID de incidencia inválido"
      });
    }

    const incidencia = await Incidencia.findByPk(id);

    if (!incidencia) {
      return res.status(404).json({
        mensaje: "Incidencia no encontrada"
      });
    }

    const usuarioActual = req.session.usuario;

    const esCreador = incidencia.usuario_id === usuarioActual.id;
    const esTecnico = usuarioActual.rol === "tecnico";

    if (!esCreador && !esTecnico) {
      return res.status(403).json({
        mensaje: "No tienes permiso para cerrar esta incidencia"
      });
    }

    if (incidencia.estado === "cerrada") {
      return res.status(409).json({
        mensaje: "La incidencia ya está cerrada"
      });
    }

    incidencia.estado = "cerrada";
    await incidencia.save();

    return res.json({
      mensaje: "Incidencia cerrada correctamente",
      incidencia
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      mensaje: "Error al cerrar la incidencia"
    });
  }
});

export default router;
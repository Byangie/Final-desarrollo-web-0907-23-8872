import { Router } from "express";
import { Equipo } from "../../models/index.js";
import { requiereAutenticacion } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", requiereAutenticacion, async (req, res) => {
  try {
    const equipos = await Equipo.findAll({
      order: [["nombre", "ASC"]]
    });

    res.json(equipos);
  } catch (error) {
    console.error("Error al consultar equipos:", error);

    res.status(500).json({
      mensaje: "Error al obtener los equipos"
    });
  }
});

export default router;
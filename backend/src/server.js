import "dotenv/config";
import express from "express";
import cors from "cors";
import session from "express-session";
import connectSessionSequelize from "connect-session-sequelize";
import { sequelize } from "../models/index.js";
import authRoutes from "./routes/auth.routes.js";
import equiposRoutes from "./routes/equipos.routes.js";
import incidenciasRoutes from "./routes/incidencias.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(express.json());

const SequelizeStore = connectSessionSequelize(session.Store);

const sessionStore = new SequelizeStore({
  db: sequelize,
  tableName: "sesiones"
});

app.use(session({
  name: "lab.sid",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 8
  }
}));

app.use("/api/auth", authRoutes);
app.use("/api/equipos", equiposRoutes);
app.use("/api/incidencias", incidenciasRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    mensaje: "Servidor funcionando correctamente"
  });
});

async function iniciarServidor() {
  try {
    await sequelize.authenticate();
    console.log("Conexión a PostgreSQL exitosa");

    await sessionStore.sync();
    console.log("Almacenamiento de sesiones preparado");

    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1);
  }
}

iniciarServidor();
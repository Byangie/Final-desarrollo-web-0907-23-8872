
import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:3000/api";

async function peticion(ruta, opciones = {}) {
  const respuesta = await fetch(`${API}${ruta}`, {
    credentials: "include",
    ...opciones,
    headers: {
      "Content-Type": "application/json",
      ...opciones.headers
    }
  });

  const datos = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(datos.mensaje || "Ocurrió un error");
  }

  return datos;
}

function Icono({ nombre, size = 20 }) {
  const rutas = {
    monitor: <><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></>,
    activity: <><path d="M3 12h4l3-7 4 14 3-7h4" /></>,
    check: <><path d="m5 12 4 4L19 6" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></>,
    clipboard: <><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4V2h6v2M9 10h6M9 14h6" /></>,
    arrow: <><path d="M5 12h14m-6-6 6 6-6 6" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {rutas[nombre]}
    </svg>
  );
}

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [equipos, setEquipos] = useState([]);
  const [incidencias, setIncidencias] = useState([]);
  const [equipoId, setEquipoId] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [procesando, setProcesando] = useState(false);

  async function cargarDatos() {
    const [listaEquipos, listaIncidencias] = await Promise.all([
      peticion("/equipos"),
      peticion("/incidencias")
    ]);

    setEquipos(listaEquipos);
    setIncidencias(listaIncidencias);
  }

  useEffect(() => {
    async function verificarSesion() {
      try {
        const datos = await peticion("/auth/me");
        setUsuario(datos.usuario ?? datos);
        await cargarDatos();
      } catch {
        setUsuario(null);
      } finally {
        setCargando(false);
      }
    }

    verificarSesion();
  }, []);

  async function iniciarSesion(evento) {
    evento.preventDefault();
    setMensaje("");
    setProcesando(true);

    try {
      const datos = await peticion("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });

      setUsuario(datos.usuario);
      await cargarDatos();
      setPassword("");
      setError(false);
    } catch (err) {
      setMensaje(err.message);
      setError(true);
    } finally {
      setProcesando(false);
    }
  }

  async function cerrarSesion() {
    try {
      await peticion("/auth/logout", { method: "POST" });
      setUsuario(null);
      setEquipos([]);
      setIncidencias([]);
      setMensaje("");
    } catch (err) {
      setMensaje(err.message);
      setError(true);
    }
  }

  async function registrarIncidencia(evento) {
    evento.preventDefault();
    setMensaje("");
    setProcesando(true);

    try {
      await peticion("/incidencias", {
        method: "POST",
        body: JSON.stringify({
          equipo_id: Number(equipoId),
          descripcion
        })
      });

      setEquipoId("");
      setDescripcion("");
      setMensaje("Incidencia registrada correctamente");
      setError(false);
      await cargarDatos();
    } catch (err) {
      setMensaje(err.message);
      setError(true);
    } finally {
      setProcesando(false);
    }
  }

  async function cerrarIncidencia(id) {
    setMensaje("");

    try {
      await peticion(`/incidencias/${id}/cerrar`, {
        method: "PATCH"
      });

      setMensaje("Incidencia cerrada correctamente");
      setError(false);
      await cargarDatos();
    } catch (err) {
      setMensaje(err.message);
      setError(true);
    }
  }

  const abiertas = incidencias.filter((i) => i.estado === "abierta").length;
  const cerradas = incidencias.filter((i) => i.estado === "cerrada").length;

  if (cargando) {
    return (
      <div className="pantalla-carga">
        <div className="logo-icono"><Icono nombre="activity" size={28} /></div>
        <p>Preparando LabControl...</p>
      </div>
    );
  }

  if (!usuario) {
    return (
      <main className="login-pagina">
        <section className="login-visual">
          <div className="marca">
            <div className="logo-icono"><Icono nombre="activity" /></div>
            <span>LabControl</span>
          </div>

          <div className="login-presentacion">
            <span className="etiqueta">GESTIÓN INTELIGENTE</span>
            <h1>
              Tu laboratorio,
              <br />
              <span>bajo control.</span>
            </h1>
            <p>
              Centraliza los reportes técnicos, administra tus equipos
              y da seguimiento a cada incidencia desde un solo lugar.
            </p>

            <div className="visual-panel">
              <div className="visual-panel-top">
                <span className="punto-activo" />
                Sistema de monitoreo
                <span className="visual-online">ACTIVO</span>
              </div>
              <div className="visual-grafico">
                <div className="grafico-icono"><Icono nombre="monitor" size={28} /></div>
                <div>
                  <strong>Gestión centralizada</strong>
                  <small>Equipos · Reportes · Seguimiento</small>
                </div>
                <Icono nombre="check" size={24} />
              </div>
              <div className="visual-barras">
                <span /><span /><span /><span /><span /><span /><span /><span />
              </div>
            </div>
          </div>

          <p className="login-pie">LabControl · Plataforma de incidencias</p>
        </section>

        <section className="login-formulario-zona">
          <form className="login-card" onSubmit={iniciarSesion}>
            <div className="login-icono">
              <Icono nombre="shield" size={27} />
            </div>

            <span className="etiqueta">BIENVENIDO DE NUEVO</span>
            <h2>Iniciar sesión</h2>
            <p className="login-descripcion">
              Ingresa tus credenciales para acceder al sistema.
            </p>

            <label htmlFor="correo">Correo electrónico</label>
            <input
              id="correo"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nombre@laboratorio.com"
              autoComplete="username"
              required
            />

            <label htmlFor="clave">Contraseña</label>
            <input
              id="clave"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              autoComplete="current-password"
              required
            />

            {mensaje && (
              <div className={`mensaje ${error ? "mensaje-error" : ""}`}>
                {mensaje}
              </div>
            )}

            <button type="submit" className="boton-principal" disabled={procesando}>
              {procesando ? "Ingresando..." : "Acceder al sistema"}
              {!procesando && <Icono nombre="arrow" size={18} />}
            </button>

            <p className="login-ayuda">
              Acceso exclusivo para personal autorizado.
            </p>
          </form>
        </section>
      </main>
    );
  }

  return (
    <div className="aplicacion">
      <aside className="sidebar">
        <div className="marca">
          <div className="logo-icono"><Icono nombre="activity" /></div>
          <span>LabControl</span>
        </div>

        <p className="sidebar-seccion">ESPACIO DE TRABAJO</p>

        <div className="sidebar-enlace activo">
          <Icono nombre="clipboard" size={19} />
          <span>Panel de incidencias</span>
        </div>

        <div className="sidebar-enlace">
          <Icono nombre="monitor" size={19} />
          <span>Equipos del laboratorio</span>
        </div>

        <div className="sidebar-inferior">
          <div className="sidebar-estado">
            <span className="punto-activo" />
            Sistema operativo
          </div>
          <div className="sidebar-usuario">
            <div className="avatar">{usuario.nombre?.charAt(0).toUpperCase()}</div>
            <div>
              <strong>{usuario.nombre}</strong>
              <small>{usuario.rol}</small>
            </div>
          </div>
        </div>
      </aside>

      <div className="contenido-principal">
        <header className="encabezado">
          <div className="ruta">
            <span>LabControl</span>
            <span>/</span>
            <strong>Panel general</strong>
          </div>

          <div className="perfil">
            <span className="perfil-rol">{usuario.rol}</span>
            <button className="btn-secundario" onClick={cerrarSesion}>
              <Icono nombre="logout" size={17} />
              Cerrar sesión
            </button>
          </div>
        </header>

        <main className="contenedor">
          <section className="bienvenida">
            <div>
              <span className="etiqueta">CENTRO DE OPERACIONES</span>
              <h1>Panel de incidencias</h1>
              <p>
                Bienvenido, {usuario.nombre}. Supervisa y gestiona los
                reportes técnicos del laboratorio.
              </p>
            </div>
            <span className="bienvenida-badge">
              <span className="punto-activo" />
              Sistema activo
            </span>
          </section>

          <section className="estadisticas">
            <article className="estadistica">
              <div className="estadistica-icono azul"><Icono nombre="monitor" /></div>
              <span>Equipos registrados</span>
              <strong>{equipos.length}</strong>
              <small>Inventario del laboratorio</small>
            </article>

            <article className="estadistica">
              <div className="estadistica-icono naranja"><Icono nombre="activity" /></div>
              <span>Incidencias abiertas</span>
              <strong>{abiertas}</strong>
              <small>Pendientes de resolución</small>
            </article>

            <article className="estadistica">
              <div className="estadistica-icono verde"><Icono nombre="check" /></div>
              <span>Incidencias cerradas</span>
              <strong>{cerradas}</strong>
              <small>Reportes resueltos</small>
            </article>
          </section>

          {mensaje && (
            <div className={`mensaje ${error ? "mensaje-error" : ""}`}>
              {mensaje}
            </div>
          )}

          <div className="columnas">
            <section className="panel">
              <div className="panel-cabecera">
                <div className="panel-icono"><Icono nombre="plus" /></div>
                <div>
                  <h2>Nueva incidencia</h2>
                  <p>Registra un problema técnico</p>
                </div>
              </div>

              <form onSubmit={registrarIncidencia}>
                <label htmlFor="equipo">Equipo afectado</label>
                <select
                  id="equipo"
                  value={equipoId}
                  onChange={(e) => setEquipoId(e.target.value)}
                  required
                >
                  <option value="">Selecciona un equipo</option>
                  {equipos.map((equipo) => (
                    <option key={equipo.id} value={equipo.id}>
                      {equipo.nombre} ({equipo.codigo})
                    </option>
                  ))}
                </select>

                <label htmlFor="descripcion">Descripción del problema</label>
                <textarea
                  id="descripcion"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Describe detalladamente el problema detectado..."
                  minLength={5}
                  required
                />

                <button className="boton-principal" type="submit" disabled={procesando}>
                  <Icono nombre="plus" size={18} />
                  {procesando ? "Registrando..." : "Registrar incidencia"}
                </button>
              </form>
            </section>

            <section className="panel">
              <div className="panel-cabecera">
                <div className="panel-icono"><Icono nombre="monitor" /></div>
                <div>
                  <h2>Equipos del laboratorio</h2>
                  <p>{equipos.length} equipos disponibles</p>
                </div>
              </div>

              <div className="lista-equipos">
                {equipos.map((equipo) => (
                  <div className="equipo" key={equipo.id}>
                    <div className="equipo-icono"><Icono nombre="monitor" size={19} /></div>
                    <div className="equipo-info">
                      <strong>{equipo.nombre}</strong>
                      <small>{equipo.codigo}</small>
                    </div>
                    <span className="equipo-indicador" />
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section className="panel historial">
            <div className="panel-cabecera">
              <div className="panel-icono"><Icono nombre="clipboard" /></div>
              <div>
                <h2>Historial de incidencias</h2>
                <p>Consulta y administra los reportes registrados</p>
              </div>
              <span className="contador">{incidencias.length} reportes</span>
            </div>

            <div className="tabla-contenedor">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Equipo</th>
                    <th>Descripción</th>
                    <th>Reportado por</th>
                    <th>Estado</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {incidencias.map((incidencia) => {
                    const puedeCerrar =
                      incidencia.usuario_id === usuario.id ||
                      usuario.rol === "tecnico";

                    return (
                      <tr key={incidencia.id}>
                        <td className="id-tabla">#{incidencia.id}</td>
                        <td className="nombre-equipo">{incidencia.equipo?.nombre}</td>
                        <td>{incidencia.descripcion}</td>
                        <td>{incidencia.usuario?.nombre}</td>
                        <td>
                          <span className={`estado ${incidencia.estado}`}>
                            <span className="estado-punto" />
                            {incidencia.estado}
                          </span>
                        </td>
                        <td>
                          {incidencia.estado === "abierta" && puedeCerrar ? (
                            <button
                              className="btn-cerrar"
                              onClick={() => cerrarIncidencia(incidencia.id)}
                            >
                              <Icono nombre="check" size={15} />
                              Cerrar
                            </button>
                          ) : (
                            <span className="sin-accion">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {incidencias.length === 0 && (
                <p className="vacio">No hay incidencias registradas.</p>
              )}
            </div>
          </section>

          <footer className="pie-pagina">
            LabControl · Sistema de gestión de incidencias
          </footer>
        </main>
      </div>
    </div>
  );
}

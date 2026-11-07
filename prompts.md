# Registro de prompts utilizados con inteligencia artificial

Herramienta utilizada: ChatGPT

Los siguientes prompts resumen las solicitudes realizadas durante el desarrollo. Algunos están redactados de forma resumida y no representan transcripciones literales.

## 1. Análisis de los requisitos proporcionados

Prompt: Necesito desarrollar una aplicación web para gestionar incidencias de equipos de un laboratorio, utilizando Node.js, Express, Sequelize, PostgreSQL y React. Los requisitos del examen indican que debe existir autenticación mediante sesiones con cookies, dos roles (usuario y tecnico), consulta de equipos, registro de incidencias y cierre de reportes únicamente por su creador o por un técnico.

También proporcioné los requisitos de las tres tablas principales:

- **usuarios:** id, nombre, email, password_hash y rol.
- **equipos:** id, nombre y codigo.
- **incidencias:** id, equipo_id, usuario_id, descripcion y estado.

Uso: Solicité ayuda para interpretar los requisitos del examen y organizar su implementación, respetando las tablas y funcionalidades indicadas.

## 2. Implementación de las tablas y migraciones

Prompt: Con base en las tablas y campos que te proporcioné en los requisitos, ayúdame a crear las migraciones y los modelos correspondientes utilizando Sequelize y PostgreSQL. Necesito conservar los nombres de las tablas, establecer las claves primarias y foráneas, y relacionar cada incidencia con el equipo afectado y el usuario que la registró.

Uso: Implementar en PostgreSQL la estructura solicitada en el examen mediante migraciones de Sequelize, sin modificar los requisitos originales.

## 3. Corrección de CommonJS y ES Modules

Prompt: Mi proyecto utiliza "type": "module" y quiero trabajar con import y export. ¿Por qué me estás indicando utilizar require y module.exports? Ayúdame a corregir la configuración sin cambiar el sistema de módulos del backend.

Uso: Corregir la incompatibilidad entre CommonJS y ES Modules, utilizando archivos .cjs donde Sequelize CLI lo requiere.

## 4. Creación de modelos

Prompt: Ayúdame a crear los modelos Usuario, Equipo e Incidencia con Sequelize, utilizando ES Modules y definiendo correctamente las asociaciones y claves foráneas.

Uso: Implementar los modelos que representan las tablas de PostgreSQL.

## 5. Autenticación mediante sesiones

Prompt: Necesito implementar un inicio de sesión con Express, bcrypt y express-session. La sesión debe almacenarse mediante Sequelize y utilizar cookies, sin implementar JWT.

Uso: Crear las rutas de inicio de sesión, consulta del usuario autenticado y cierre de sesión.

## 6. Registro y consulta de equipos e incidencias

Prompt: Ayúdame a implementar rutas protegidas para consultar los equipos, registrar una incidencia y listar los reportes con la información del equipo y del usuario que los creó.

Uso: Desarrollar los endpoints principales del sistema.

## 7. Validación de permisos

Prompt: Implementa una ruta para cerrar incidencias. Solamente el usuario que creó la incidencia o un técnico debe tener permiso. La validación debe realizarse en el backend.

Uso: Aplicar las reglas de autorización según el usuario autenticado y su rol.

## 8. Pruebas mediante PowerShell

Prompt: Ayúdame a probar los endpoints utilizando Invoke-RestMethod en PowerShell, conservando las cookies de sesión y comprobando los permisos de los diferentes usuarios.

Uso: Verificar el inicio de sesión, registro de incidencias y respuestas HTTP, incluyendo el rechazo 403 para usuarios sin autorización.

## 9. Desarrollo del frontend con React

Prompt: Ayúdame a crear una interfaz en React que permita iniciar sesión, consultar equipos, registrar incidencias, visualizar reportes y cerrarlos según los permisos del usuario.

Uso: Conectar el frontend con la API de Express mediante fetch y credentials: "include".

## 10. Diseño visual del sistema

Prompt: Rediseñemos LabControl completo con estilo oscuro. Dame los archivos React y CSS necesarios, sin cambiar la funcionalidad.

Uso: Mejorar la presentación de la aplicación mediante una interfaz oscura con barra lateral, tarjetas de estadísticas, formularios y tabla de incidencias.


## Verificación personal

Durante el desarrollo revisé y ejecuté los comandos proporcionados por la inteligencia artificial. También realicé pruebas de conexión con PostgreSQL, autenticación, registro de incidencias y validación de permisos.

Uno de los resultados más importantes fue comprobar que un usuario normal recibió una respuesta HTTP 403 al intentar cerrar una incidencia ajena, mientras que el técnico pudo cerrarla correctamente.

La inteligencia artificial se utilizó como herramienta de apoyo, pero fue necesario revisar sus respuestas, corregir incompatibilidades y comprobar el funcionamiento de la aplicación.
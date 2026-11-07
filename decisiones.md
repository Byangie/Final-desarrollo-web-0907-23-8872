# Decisiones Tomadas

## Que entendio del problema y que tablas/modelos planeo 
Entendí que debía desarrollar una aplicación web para registrar y administrar incidencias de equipos de un laboratorio. El sistema debía permitir iniciar sesión, consultar los equipos disponibles, registrar problemas y cerrar incidencias, respetando los permisos de cada usuario.

Para organizar la información decidí utilizar PostgreSQL con Sequelize y crear tres modelos principales:

Usuario: almacena el nombre, correo, contraseña cifrada y rol (usuario o tecnico).
Equipo: almacena el nombre y código único de cada equipo.
Incidencia:registra el equipo afectado, el usuario que reportó el problema, su descripción y su estado (abierta o cerrada).

También consideré necesario relacionar las incidencias con los usuarios y equipos mediante claves foráneas. Para la autenticación utilicé sesiones almacenadas en PostgreSQL y cookies, en lugar de JWT.

## B. Partes delegadas a la inteligencia artificial y por qué

Utilicé inteligencia artificial como apoyo para estructurar el proyecto, generar ejemplos de código y resolver dudas durante el desarrollo.

Principalmente solicité ayuda para configurar Sequelize, crear las migraciones y modelos, implementar las rutas de Express, manejar las sesiones y desarrollar las validaciones de permisos.

Delegué estas tareas porque necesitaba avanzar de manera organizada durante el tiempo limitado del examen. Sin embargo, fui ejecutando los comandos y comprobando los resultados mediante pruebas en PowerShell, verificando que las funcionalidades realmente trabajaran con la base de datos.

## C. Error de la inteligencia
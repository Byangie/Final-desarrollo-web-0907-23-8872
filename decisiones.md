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

Error identificado: Durante la configuración del backend, la inteligencia artificial me proporcionó código utilizando CommonJS (require y module.exports), aunque mi proyecto estaba configurado para trabajar con ES Modules (import y export).

¿Cómo me di cuenta? Al revisar el archivo package.json, observé que tenía configurado "type": "module", por lo que utilizar CommonJS en los archivos .js de la aplicación generaba una incompatibilidad con la estructura del proyecto.

¿Cómo lo corregí? Le indiqué a la IA que debía respetar la configuración de ES Modules. Finalmente, mantuve impor y export en los archivos del backend y utilicé la extensión .cjs únicamente en los archivos que necesitaban CommonJS para funcionar con Sequelize CLI, como las migraciones y la configuración.

Aprendizaje:Comprendí que no todas las respuestas de la IA son directamente compatibles con un proyecto y que es importante revisar la configuración y comprender el código antes de implementarlo.
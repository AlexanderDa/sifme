# Environments

Esta sección describe las variables de entorno necesarias para que  el back-end pueda funcionar correctamente, manteniendo la privacidad de credenciales.



* **Servidor**

Configuración de las variables del servidor del servidor.

| ENV          | POR DEFECTO           | DESCRIPCIÓN                                               |
| :----------- | :-------------------- | :-------------------------------------------------------- |
| SIFME_DOMAIN | http://localhost:3000 | Nombre del dominio, para la carga de archivos al sistema. |



* **Base de datos**

El sistema está utilizando *postgresql* como sistema de gestión de bases de datos, para lo cual es necesario estalecer las credenciales de acceso a dicho sistema de base de datos.

| ENV                | POR DEFECTO | DESCRIPCIÓN                            |
| :----------------- | :---------- | :------------------------------------- |
| SIFME_PGC_HOST     | localhost   | Host de la base de datos.              |
| SIFME_PGC_PORT     | 5432        | Puerto utilizado por la base de datos. |
| SIFME_PGC_USER     | postgres    | Usuario de la base de datos.           |
| SIFME_PGC_PASSWORD | postgres    | Contraseña de la base de datos.        |
| SIFME_PGC_DATABASE | sifme       | Nombre de la base de datos.            |



* **Token de acceso**

Variables para el token de acceso que permite la autenticación de un usuario y el uso de la API.

| ENV                    | POR DEFECTO    | DESCRIPCIÓN                                    |
| ---------------------- | -------------- | ---------------------------------------------- |
| SIFME_TOKEN_SECRET     | My\$3cREtP4\$S | Clave para el cifrado del token de acceso.     |
| SIFME_TOKEN_EXPIRES_IN | 3600           | Tiempo de validez de un token en milisegundos. |



* **Servicio de correo electrónico**

Para facilitar la creación de una cuenta de usuario y la restauración de contraseñas se recomienda utilizar un correo electrónico, para habilitar este servicio se requieren las tres variables que se muestran a continuación, si las variables no existen, los servicios de correo electrónico no estará disponibles.

| ENV                  | EJEMPLO            | DESCRIPCIÓN                                       |
| :------------------- | :----------------- | :------------------------------------------------ |
| SIFME_SMTP_HOST      | smtp.office365.com | Nombre de host o la dirección IP para conectarse. |
| SIFME_EMAIL_ADDRESS  | user@example.com   | Cuenta de correo electrónico                      |
| SIFME_EMAIL_PASSWORD | My\$3cREtP4\$S     | Contraseña de correo electrónico                  |

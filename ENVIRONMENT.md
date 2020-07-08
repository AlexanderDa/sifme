# Environments

This section describes the environment variables that the system uses back-end.

* **Server**
The server needs some variables like.

| ENV NAME     | DEFAULT VALUE         | DESCRIPTION |
| :----------- | :-------------------- | :---------- |
| SIFME_DOMAIN | http://localhost:3000 | Domain name |

* **Connection to the database**

  The system is using *postgresql* as the database management system.

| ENV NAME           | DEFAULT VALUE | DESCRIPTION                |
| :----------------- | :------------ | :------------------------- |
| SIFME_PGC_HOST     | localhost     | Database host.             |
| SIFME_PGC_PORT     | 5432          | Port used by the database. |
| SIFME_PGC_USER     | postgres      | Database user.             |
| SIFME_PGC_PASSWORD | postgres      | Database user password.    |
| SIFME_PGC_DATABASE | sifme         | Database name.             |

* **Access token**

  Access tokens that allow the navigability and the use of the API.

| ENV NAME               | DEFAULT VALUE  | DESCRIPTION                               |
| ---------------------- | -------------- | ----------------------------------------- |
| SIFME_TOKEN_SECRET     | My\$3cREtP4\$S | Key to encryption.                        |
| SIFME_TOKEN_EXPIRES_IN | 3600           | Validity time of a token in milliseconds. |



* **Email service**

  To facilitate the creation of a user account, it is recommended to use an email, for which the three variables shown below are required to enable this service, but if the variables do not exist, email services are not available.
  
| ENV NAME              | EXAMPLE            | DESCRIPTION                               |
| :-------------------- | :----------------- | :---------------------------------------- |
| SIFME_EMAIL_SMTP_HOST | smtp.office365.com | Is the hostname or IP address to connect. |
| SIFME_EMAIL_ADDRESS   | user@example.com   | Email account                             |
| SIFME_EMAIL_PASSWORD  | My\$3cREtP4\$S     | Email password                            |
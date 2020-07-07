# Environments

This section describes the environment variables that the system uses back-end.



* **Connection to the database**

  The system is using *postgresql* as the database management system.

| ENV NAME          | DEFAULT VALUE | DESCRIPTION                |
| :---------------- | :------------ | :------------------------- |
| SIFMEPGC_HOST     | localhost     | Database host.             |
| SIFMEPGC_PORT     | 5432          | Port used by the database. |
| SIFMEPGC_USER     | postgres      | Database user.             |
| SIFMEPGC_PASSWORD | postgres      | Database user password.    |
| SIFMEPGC_DATABASE | sifme         | Database name.             |

* **Access token**

  Access tokens that allow the navigability and the use of the API.

| ENV NAME   | DEFAULT VALUE | DESCRIPTION |
| ---------- | ------------- | ----------- |
| SECRET     | My\$3cREtP4\$S  | Key to encryption. |
| EXPIRES_IN | 3600          | Validity time of a token in milliseconds. |

  
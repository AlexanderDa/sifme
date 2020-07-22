# Datasources

This directory contains config for datasources used by this app.


To automatically generate a repository, you must create a configuration file with the following specifications.
```json
{
    "name": "sifmePGC",
    "connector": "postgresql",
    "url": "postgresql://postgres:postgres@localhost:5432/sifme"
}
```
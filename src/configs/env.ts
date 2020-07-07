export const sifmePGC = {
  name: 'sifmePGC',
  connector: 'postgresql',
  host: process.env.SIFMEPGC_HOST ?? 'localhost',
  port: process.env.SIFMEPGC_PORT ?? 5432,
  user: process.env.SIFMEPGC_USER ?? 'postgres',
  password: process.env.SIFMEPGC_PASSWORD ?? 'postgres',
  database: process.env.SIFMEPGC_DATABASE ?? 'sifme',
};

export const TOKEN = {
  secret: process.env.SECRET ?? 'My$3cREtP4$S',
  expiresIn: process.env.EXPIRES_IN ?? 3600,
};

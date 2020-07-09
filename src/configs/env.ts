export const SERVER = {
    domain: process.env.SIFME_DOMAIN ?? 'http://localhost:3000'
}

export const SIFMEPGC = {
    name: 'sifmePGC',
    connector: 'postgresql',
    host: process.env.SIFME_PGC_HOST ?? 'localhost',
    port: process.env.SIFME_PGC_PORT ?? 5432,
    user: process.env.SIFME_PGC_USER ?? 'postgres',
    password: process.env.SIFME_PGC_PASSWORD ?? 'postgres',
    database: process.env.SIFME_PGC_DATABASE ?? 'sifme'
}

export const TOKEN = {
    secret: process.env.SIFME_TOKEN_SECRET ?? 'My$3cREtP4$S',
    expiresIn: process.env.SIFME_TOKEN_EXPIRES_IN ?? '3600' // it must be a string
}

export const EMAIL = {
    smptHost: process.env.SIFME_SMTP_HOST ?? '',
    address: process.env.SIFME_EMAIL_ADDRESS ?? '',
    password: process.env.SIFME_EMAIL_PASSWORD ?? '',
    isSupported: (): boolean => {
        return (
            process.env.SIFME_SMTP_HOST !== undefined &&
            process.env.SIFME_EMAIL_ADDRESS !== undefined &&
            process.env.SIFME_EMAIL_PASSWORD !== undefined
        )
    }
}

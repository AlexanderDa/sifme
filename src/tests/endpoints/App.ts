import { Application } from '../..'
import { createRestAppClient } from '@loopback/testlab'
import { givenHttpServerConfig } from '@loopback/testlab'
import { Client } from '@loopback/testlab'
import { SimpleUserRepository } from '../../repositories'
import { SifmePgcDataSource } from '../../datasources'
import { DEFAULT_ADMIN } from '../../configs'
import { User } from '../../models'

export async function setupApplication(): Promise<AppWithClient> {
    const restConfig = givenHttpServerConfig({
        // Customize the server configuration here.
        // Empty values (undefined, '') will be ignored by the helper.
        //
        // host: process.env.HOST,
        // port: +process.env.PORT,
    })

    const app = new Application({
        rest: restConfig
    })

    await app.boot()
    await app.start()

    const client = createRestAppClient(app)

    return { app, client }
}

export async function setupApplicationWithToken(): Promise<AppWithClientLogged> {
    const setup = await setupApplication()
    const app: Application = setup.app
    const client: Client = setup.client

    // get access token
    const resToken = await client.post('/api/account/login').send({
        email: DEFAULT_ADMIN.email,
        password: DEFAULT_ADMIN.password
    })
    const token = resToken.body.token

    // get account profile
    const resProfile = await client.get('/api/account/me').auth(token, { type: 'bearer' })
    const profile: User = resProfile.body

    return { app, client, token, profile }
}

export function setupUserRepository(): SimpleUserRepository {
    return new SimpleUserRepository(new SifmePgcDataSource())
}

export interface AppWithClient {
    app: Application
    client: Client
}
export interface AppWithClientLogged extends AppWithClient {
    token: string
    profile: User
}

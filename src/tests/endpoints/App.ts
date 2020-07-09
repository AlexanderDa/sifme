import { Application } from '../..'
import { createRestAppClient } from '@loopback/testlab'
import { givenHttpServerConfig } from '@loopback/testlab'
import { Client } from '@loopback/testlab'
import { SimpleUserRepository } from '../../repositories'
import { SifmePgcDataSource } from '../../datasources'

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

export function setupUserRepository(): SimpleUserRepository {
    return new SimpleUserRepository(new SifmePgcDataSource())
}

export interface AppWithClient {
    app: Application
    client: Client
}

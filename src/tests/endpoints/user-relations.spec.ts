import { Client, expect } from '@loopback/testlab'
import { Application } from '../..'
import { setupApplicationWithToken } from './app.test'
import { cli } from '../../utils'
import { User } from '../../models'

let app: Application
let client: Client
let token: string
let profile: User

before('setupApplication', async () => {
    ;({ app, client, token, profile } = await setupApplicationWithToken())
})

after(async () => {
    await app.stop()
})

describe(cli.withAccess('User relations endpoint'), () => {
    it('GET     =>  /api/user/{id}/profile', async () => {
        await client
            .get(`/api/user/${profile.id}/profile`)
            .auth(token, { type: 'bearer' })
            .expect(200)
            .then(res => {
                expect(res.body).to.have.property('createdAt').to.be.not.null()
            })
    })
})

describe(cli.noAccess('User relations endpoint'), () => {
    it('GET     =>  /api/user/{id}/profile', async () => {
        await client.get(`/api/user/${profile.id}/profile`).expect(401)
    })
})

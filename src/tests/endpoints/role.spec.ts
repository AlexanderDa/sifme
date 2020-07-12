import { Client, expect } from '@loopback/testlab'
import { Application } from '../..'
import { setupApplicationWithToken } from './App'
import { cli } from '../../utils'

let app: Application
let client: Client
let token: string

before('setupApplication', async () => {
    ;({ app, client, token } = await setupApplicationWithToken())
})

after(async () => {
    await app.stop()
})

describe(cli.noAccess('Role endpoint'), () => {
    it('GET     =>  /api/roles', async () => {
        await client
            .get('/api/roles')
            .expect(401)
            .then(err => {
                expect(err.body)
                    .to.have.property('error')
                    .to.have.property('message')
                    .to.be.equal('NO_TOKEN')
            })
    })
})

describe(cli.withAccess('Role endpoint'), () => {
    it('GET     =>  /api/roles', async () => {
        await client
            .get('/api/roles')
            .auth(token, { type: 'bearer' })
            .expect(200)
            .then(res => {
                expect(res.body).to.be.an.Array().to.have.length(3)
            })
    })
})

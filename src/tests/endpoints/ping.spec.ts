import { Client, expect } from '@loopback/testlab'
import { Application } from '../..'
import { setupApplication } from './app.test'

describe('Ping endpoint', () => {
    let app: Application
    let client: Client

    before('setupApplication', async () => {
        ;({ app, client } = await setupApplication())
    })

    after(async () => {
        await app.stop()
    })

    it('GET     =>  /api/ping', async () => {
        const res = await client.get('/ping').expect(200)
        expect(res.body).to.containEql({ success: true })
    })
})

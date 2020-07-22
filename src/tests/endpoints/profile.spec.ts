import { Client, expect } from '@loopback/testlab'
import { Application } from '../..'
import { setupApplicationWithToken } from './app.test'
import { cli } from '../../utils'
import { Profile } from '../../models'
import { User } from '../../models'

let app: Application
let client: Client
let token: string
let profile: User
let testProfile: Profile

before('setupApplication', async () => {
    ;({ app, client, token, profile } = await setupApplicationWithToken())
    testProfile = new Profile({
        lastName: `ln${Date.now()}`,
        firstName: `fn${Date.now()}`,
        address: `address${Date.now()}`
    })
})

after(async () => {
    await app.stop()
})

describe(cli.withAccess('Profile endpoint'), () => {
    it('POST    =>  /api/profile', async () => {
        await client
            .post('/api/profile')
            .send(testProfile)
            .auth(token, { type: 'bearer' })
            .expect(200)
            .then(res => {
                expect(res.body).to.have.property('createdAt').to.be.not.null()
                expect(res.body).to.have.property('createdBy').to.be.equal(profile.id)
                // element created
                testProfile = res.body
            })
    })

    it('GET     =>  /api/profiles/count', async () => {
        await client
            .get('/api/profiles/count')
            .query({})
            .auth(token, { type: 'bearer' })
            .expect(200)
            .then(res => {
                expect(res.body).to.have.property('count').to.be.Number()
            })
    })

    it('GET     =>  /api/profiles', async () => {
        await client
            .get('/api/profiles')
            .auth(token, { type: 'bearer' })
            .expect(200)
            .then(res => {
                expect(res.body).to.be.an.Array()
            })
    })

    it('PATCH   =>  /api/profiles', async () => {
        await client
            .patch('/api/profiles')
            .auth(token, { type: 'bearer' })
            .query({ where: { id: testProfile.id } })
            .send({ lastName: `ln_patch_${Date.now()}` })
            .expect(200)
            .then(res => {
                expect(res.body).to.have.property('count').to.be.Number()
            })
    })

    it('GET     =>  /api/profile/{id}', async () => {
        await client
            .get(`/api/profile/${testProfile.id}`)
            .auth(token, { type: 'bearer' })
            .expect(200)
            .then(res => {
                expect(res.body)
                    .to.have.property('createdAt')
                    .to.be.equal(testProfile.createdAt)
            })
    })

    it('PATCH   =>  /api/profile/{id}', async () => {
        await client
            .patch(`/api/profile/${testProfile.id}`)
            .auth(token, { type: 'bearer' })
            .send({ firstName: `fn_patch_${Date.now()}` })
            .expect(204)
    })

    it('PUT     =>  /api/profile/{id}', async () => {
        await client
            .put(`/api/profile/${testProfile.id}`)
            .auth(token, { type: 'bearer' })
            .send(testProfile)
            .expect(204)
    })

    it('DELETE  =>  /api/profile/{id}', async () => {
        await client
            .delete(`/api/profile/${testProfile.id}`)
            .auth(token, { type: 'bearer' })
            .expect(204)
    })
})

describe(cli.noAccess('Profile endpoint'), () => {
    it('POST    =>  /api/profile', async () => {
        await client.post('/api/profile').expect(401)
    })

    it('GET     =>  /api/profiles/count', async () => {
        await client.get('/api/profiles').expect(401)
    })

    it('GET     =>  /api/profiles', async () => {
        await client.get('/api/profiles').expect(401)
    })

    it('PATCH   =>  /api/profiles', async () => {
        await client.patch('/api/profiles').expect(401)
    })

    it('GET     =>  /api/profile/{id}', async () => {
        await client.get('/api/profile/1').expect(401)
    })

    it('PATCH   =>  /api/profile/{id}', async () => {
        await client.patch('/api/profile/1').expect(401)
    })

    it('PUT     =>  /api/profile/{id}', async () => {
        await client.put('/api/profile/1').expect(401)
    })

    it('DELETE  =>  /api/profile/{id}', async () => {
        await client.delete('/api/profile/1').expect(401)
    })
})

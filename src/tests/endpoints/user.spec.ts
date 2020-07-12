import { Client, expect } from '@loopback/testlab'
import { Application } from '../..'
import { setupApplicationWithToken } from './App'
import { cli, random } from '../../utils'
import { User } from '../../models'
import { MEDICO } from '../../configs'

let app: Application
let client: Client
let token: string
let profile: User
let user: User

before('setupApplication', async () => {
    ;({ app, client, token, profile } = await setupApplicationWithToken())
    user = new User({ email: random.email(), roleId: MEDICO.ID })
})

after(async () => {
    await app.stop()
})

describe(cli.withAccess('User endpoint'), () => {
    it('POST    =>  /api/user', async () => {
        await client
            .post('/api/user')
            .send(user)
            .auth(token, { type: 'bearer' })
            .expect(200)
            .then(res => {
                expect(res.body).to.have.property('createdAt').to.be.not.null()
                expect(res.body).to.have.property('createdBy').to.be.equal(profile.id)
                // element created
                user = res.body
            })
    })

    it('GET     =>  /api/users/count', async () => {
        await client
            .get('/api/users/count')
            .query({})
            .auth(token, { type: 'bearer' })
            .expect(200)
            .then(res => {
                expect(res.body).to.have.property('count').to.be.Number()
            })
    })

    it('GET     =>  /api/users', async () => {
        await client
            .get('/api/users')
            .auth(token, { type: 'bearer' })
            .expect(200)
            .then(res => {
                expect(res.body).to.be.an.Array()
            })
    })

    it('PATCH   =>  /api/users', async () => {
        await client
            .patch('/api/users')
            .auth(token, { type: 'bearer' })
            .query({ roleId: 2 })
            .send({ roleId: 3 })
            .expect(200)
            .then(res => {
                expect(res.body).to.have.property('count').to.be.Number()
            })
    })

    it('GET     =>  /api/user/{id}', async () => {
        await client
            .get(`/api/user/${user.id}`)
            .auth(token, { type: 'bearer' })
            .expect(200)
            .then(res => {
                expect(res.body).to.have.property('createdAt').to.be.equal(user.createdAt)
            })
    })

    it('PATCH   =>  /api/user/{id}', async () => {
        await client
            .patch(`/api/user/${user.id}`)
            .auth(token, { type: 'bearer' })
            .send({ roleId: MEDICO.ID })
            .expect(204)
    })

    it('PUT     =>  /api/user/{id}', async () => {
        await client
            .put(`/api/user/${user.id}`)
            .auth(token, { type: 'bearer' })
            .send(user)
            .expect(204)
    })

    it('DELETE  =>  /api/user/{id}', async () => {
        await client
            .delete(`/api/user/${user.id}`)
            .auth(token, { type: 'bearer' })
            .expect(204)
    })
})

describe(cli.noAccess('User endpoint'), () => {
    it('POST    =>  /api/user', async () => {
        await client.post('/api/user').expect(401)
    })

    it('GET     =>  /api/users/count', async () => {
        await client.get('/api/users').expect(401)
    })

    it('GET     =>  /api/users', async () => {
        await client.get('/api/users').expect(401)
    })

    it('PATCH   =>  /api/users', async () => {
        await client.patch('/api/users').expect(401)
    })

    it('GET     =>  /api/user/{id}', async () => {
        await client.get('/api/user/1').expect(401)
    })

    it('PATCH   =>  /api/user/{id}', async () => {
        await client.patch('/api/user/1').expect(401)
    })

    it('PUT     =>  /api/user/{id}', async () => {
        await client.put('/api/user/1').expect(401)
    })

    it('DELETE  =>  /api/user/{id}', async () => {
        await client.delete('/api/user/1').expect(401)
    })
})

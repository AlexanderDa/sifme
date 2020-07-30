import { Client, expect } from '@loopback/testlab'
import { Application } from '../..'
import { setupApplicationWithToken } from './app.test'
import { ProfileRepository } from '../../repositories'
import { UserRepository } from '../../repositories'
import { cli, random } from '../../utils'
import { User, Profile } from '../../models'
import { MEDICO } from '../../configs'
import { NURSING } from '../../configs'

let app: Application
let client: Client
let token: string
let profile: User
let profileModel: Profile
let userModel: User

before('setupApplication', async () => {
    ;({ app, client, token, profile } = await setupApplicationWithToken())
    const profileRepo = await app.getRepository(ProfileRepository)
    profileModel = await profileRepo.create({
        lastName: `ln${Date.now()}`,
        firstName: `fn${Date.now()}`,
        address: `address${Date.now()}`,
        email: random.email(),
        createdBy: profile.id
    })
})

after(async () => {
    await app.stop()
})

describe(cli.withAccess('User endpoint'), () => {
    it('POST    =>  /api/user/profile/{id}', async () => {
        await client
            .post(`/api/user/profile/${profileModel.id}`)
            .send({
                email: profileModel.email,
                roleId: MEDICO.ID,
                profileId: profileModel.id
            })
            .auth(token, { type: 'bearer' })
            .expect(200)
            .then(res => {
                expect(res.body).to.have.property('createdAt').to.be.not.null()
                expect(res.body).to.have.property('createdBy').to.be.equal(profile.id)
                // element created
                userModel = res.body
            })
    })

    it('GET     =>  /api/user/profile/{id}', async () => {
        await client
            .get(`/api/user/profile/${profileModel.id}`)
            .auth(token, { type: 'bearer' })
            .expect(200)
            .then(res => {
                expect(res.body).to.have.property('createdAt').to.be.not.null()
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
            .query({ where: { roleId: MEDICO.ID } })
            .send({ roleId: NURSING.ID })
            .expect(200)
            .then(res => {
                expect(res.body).to.have.property('count').to.be.Number()
            })
    })

    it('GET     =>  /api/user/{id}', async () => {
        await client
            .get(`/api/user/${userModel.id}`)
            .auth(token, { type: 'bearer' })
            .expect(200)
            .then(res => {
                expect(res.body)
                    .to.have.property('createdAt')
                    .to.be.equal(userModel.createdAt)
            })
    })

    it('PATCH   =>  /api/user/{id}', async () => {
        await client
            .patch(`/api/user/${userModel.id}`)
            .auth(token, { type: 'bearer' })
            .send({ roleId: MEDICO.ID })
            .expect(204)
    })

    it('PUT     =>  /api/user/{id}', async () => {
        await client
            .put(`/api/user/${userModel.id}`)
            .auth(token, { type: 'bearer' })
            .send(userModel)
            .expect(204)
    })

    it('DELETE  =>  /api/user/{id}', async () => {
        await client
            .delete(`/api/user/${userModel.id}`)
            .auth(token, { type: 'bearer' })
            .expect(204)
            .then(async () => {
                // check if it's in deleted status
                const userRepo = await app.getRepository(UserRepository)
                const profileRepo = await app.getRepository(ProfileRepository)
                const result = await userRepo.findById(userModel.id)
                expect(result).to.have.property('deleted').to.be.eql(true)
                expect(result).to.have.property('deletedAt').to.be.not.null()
                expect(result).to.have.property('deletedBy').to.be.eql(profile.id)

                // delete from database
                await userRepo.deleteById(userModel.id)
                await profileRepo.deleteById(profileModel.id)
            })
    })
})

describe(cli.noAccess('User endpoint'), () => {
    it(`POST    =>  /api/user/profile/{id}`, async () => {
        await client.post(`/api/user/profile/1`).expect(401)
    })

    it(`GET     =>  /api/user/profile/{id}`, async () => {
        await client.get(`/api/user/profile/1`).expect(401)
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

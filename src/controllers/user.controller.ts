import { authenticate } from '@loopback/authentication'
import { inject } from '@loopback/core'
import { Count } from '@loopback/repository'
import { Filter } from '@loopback/repository'
import { FilterExcludingWhere } from '@loopback/repository'
import { repository } from '@loopback/repository'
import { Where } from '@loopback/repository'
import { post } from '@loopback/rest'
import { param } from '@loopback/rest'
import { get } from '@loopback/rest'
import { patch } from '@loopback/rest'
import { put } from '@loopback/rest'
import { del } from '@loopback/rest'
import { requestBody } from '@loopback/rest'
import { User, Profile } from '../models'
import { UserRepository, ProfileRepository } from '../repositories'
import spect from './spects/user.spect'
import { SecurityBindings, UserProfile } from '@loopback/security'
import { AccountBindings } from '../keys'
import { AccountService } from '../services'
import { currentDate, random } from '../utils'

@authenticate('jwt')
export class UserController {
    constructor(
        @repository(UserRepository) public userRepository: UserRepository,
        @repository(ProfileRepository) protected profileRepository: ProfileRepository,
        @inject(AccountBindings.SERVICE) public acountService: AccountService
    ) {}

    /*@post('/api/user', spect.responseOne())
    async create(
        @requestBody(spect.requestBody()) user: Omit<User, 'id'>,
        @inject(SecurityBindings.USER) profile: UserProfile
    ): Promise<User> {
        const account = await this.acountService.convertToUser(profile)
        user.createdBy = account.id ?? 0
        return this.userRepository.create(user)
    }*/

    @post('/api/user/profile/{id}', spect.responseOne())
    async create(
        @param.path.number('id') id: typeof Profile.prototype.id,
        @requestBody(spect.requestBody()) user: Omit<User, 'id'>,
        @inject(SecurityBindings.USER) account: UserProfile
    ): Promise<User> {
        const myAccount = await this.acountService.convertToUser(account)
        user.createdBy = myAccount.id ?? 0
        user.verificationToken = random.emailVerifiedCode(user.email)
        return this.profileRepository.user(id).create(user)
    }

    @get('/api/user/profile/{id}', spect.responseOne())
    async findByProfileId(
        @param.path.number('id') id: number,
        @param.query.object('filter') filter?: Filter<User>
    ): Promise<User> {
        return this.profileRepository.user(id).get(filter)
    }

    @get('/api/users/count', spect.responseCount())
    async count(@param.where(User) where?: Where<User>): Promise<Count> {
        return this.userRepository.count(where)
    }

    @get('/api/users', spect.responseList())
    async find(@param.filter(User) filter?: Filter<User>): Promise<User[]> {
        return this.userRepository.find(filter)
    }

    @patch('/api/users', spect.responsePatchCount())
    async updateAll(
        @requestBody(spect.requestPartialBoby()) user: User,
        @param.where(User) where?: Where<User>
    ): Promise<Count> {
        return this.userRepository.updateAll(user, where)
    }

    @get('/api/user/{id}', spect.responseOne())
    async findById(
        @param.path.number('id') id: number,
        @param.filter(User, { exclude: 'where' }) filter?: FilterExcludingWhere<User>
    ): Promise<User> {
        return this.userRepository.findById(id, filter)
    }

    @patch('/api/user/{id}', spect.responseSimple('PATCH'))
    async updateById(
        @param.path.number('id') id: number,
        @requestBody(spect.requestPartialBoby()) user: User
    ): Promise<void> {
        await this.userRepository.updateById(id, user)
    }

    @put('/api/user/{id}', spect.responseSimple('PUT'))
    async replaceById(
        @param.path.number('id') id: number,
        @requestBody() user: User
    ): Promise<void> {
        await this.userRepository.replaceById(id, user)
    }

    @del('/api/user/{id}', spect.responseSimple('DELETE'))
    async deleteById(
        @inject(SecurityBindings.USER) profile: UserProfile,
        @param.path.number('id') id: number
    ): Promise<void> {
        const account = await this.acountService.convertToUser(profile)
        await this.userRepository.updateById(id, {
            deleted: true,
            deletedBy: account.id,
            deletedAt: currentDate(),
            isActive: false
        })
    }
}

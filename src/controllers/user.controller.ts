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
import { User } from '../models'
import { UserRepository } from '../repositories'
import spect from './spects/user.spect'
import { SecurityBindings, UserProfile } from '@loopback/security'
import { AccountBindings } from '../keys'
import { AccountService } from '../services'
import { currentDate } from '../utils'
@authenticate('jwt')
export class UserController {
    constructor(
        @repository(UserRepository) public userRepository: UserRepository,
        @inject(AccountBindings.SERVICE) public acountService: AccountService
    ) {}

    @post('/api/user', spect.responseOne())
    async create(
        @requestBody(spect.requestBody()) user: Omit<User, 'id'>,
        @inject(SecurityBindings.USER) profile: UserProfile
    ): Promise<User> {
        const account = await this.acountService.convertToUser(profile)
        user.createdBy = account.id ?? 0
        return this.userRepository.create(user)
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
            deletedAt: currentDate()
        })
    }
}

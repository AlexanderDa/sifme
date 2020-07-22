import { authenticate } from '@loopback/authentication'
import { UserProfile } from '@loopback/security'
import { SecurityBindings } from '@loopback/security'
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
import { Profile } from '../models'
import { ProfileRepository } from '../repositories'
import { AccountBindings } from '../keys'
import { AccountService } from '../services'
import { currentDate } from '../utils'
import spect from './spects/profile.spect'

@authenticate('jwt')
export class ProfileController {
    constructor(
        @repository(ProfileRepository) public profileRepository: ProfileRepository,
        @inject(AccountBindings.SERVICE) public acountService: AccountService
    ) {}

    @post('/api/profile', spect.responseOne())
    async create(
        @requestBody(spect.requestBody()) profile: Omit<Profile, 'id'>,
        @inject(SecurityBindings.USER) account: UserProfile
    ): Promise<Profile> {
        const myAccount = await this.acountService.convertToUser(account)
        profile.createdBy = myAccount.id ?? 0
        return this.profileRepository.create(profile)
    }

    @get('/api/profiles/count', spect.responseCount())
    async count(@param.where(Profile) where?: Where<Profile>): Promise<Count> {
        return this.profileRepository.count(where)
    }

    @get('/api/profiles', spect.responseList())
    async find(@param.filter(Profile) filter?: Filter<Profile>): Promise<Profile[]> {
        return this.profileRepository.find(filter)
    }

    @patch('/api/profiles', spect.responsePatchCount())
    async updateAll(
        @requestBody(spect.requestPartialBoby())
        profile: Profile,
        @param.where(Profile) where?: Where<Profile>
    ): Promise<Count> {
        return this.profileRepository.updateAll(profile, where)
    }

    @get('/api/profile/{id}', spect.responseOne())
    async findById(
        @param.path.number('id') id: number,
        @param.filter(Profile, { exclude: 'where' })
        filter?: FilterExcludingWhere<Profile>
    ): Promise<Profile> {
        return this.profileRepository.findById(id, filter)
    }

    @patch('/api/profile/{id}', spect.responseSimple('PATCH'))
    async updateById(
        @param.path.number('id') id: number,
        @requestBody(spect.requestPartialBoby())
        profile: Profile
    ): Promise<void> {
        await this.profileRepository.updateById(id, profile)
    }

    @put('/api/profile/{id}', spect.responseSimple('PUT'))
    async replaceById(
        @param.path.number('id') id: number,
        @requestBody() profile: Profile
    ): Promise<void> {
        await this.profileRepository.replaceById(id, profile)
    }

    @del('/api/profile/{id}', spect.responseSimple('DELETE'))
    async deleteById(
        @inject(SecurityBindings.USER) profile: UserProfile,
        @param.path.number('id') id: number
    ): Promise<void> {
        const account = await this.acountService.convertToUser(profile)
        await this.profileRepository.updateById(id, {
            deleted: true,
            deletedBy: account.id,
            deletedAt: currentDate()
        })
    }
}

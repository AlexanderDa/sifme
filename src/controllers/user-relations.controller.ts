import { authenticate } from '@loopback/authentication'
import { param } from '@loopback/rest'
import { get } from '@loopback/rest'
import { UserRepository } from '../repositories'
import { repository } from '@loopback/repository'
import { User, Profile } from '../models'
import spect from './spects/profile.spect'

@authenticate('jwt')
export class UserRelationsController {
    constructor(@repository(UserRepository) public userRepository: UserRepository) {}

    @get('/api/user/{id}/profile', spect.responseOne())
    async profileOfUser(
        @param.path.number('id') id: typeof User.prototype.id
    ): Promise<Profile> {
        return this.userRepository.profile(id)
    }
}

import { repository } from '@loopback/repository'
import { authenticate } from '@loopback/authentication'
import { get } from '@loopback/rest'
import { Role } from '../models'
import { RoleRepository } from '../repositories'
import spect from './spects/role.spect'

@authenticate('jwt')
export class RoleController {
    constructor(@repository(RoleRepository) public roleRepository: RoleRepository) {}

    @get('/api/roles', spect.responseList())
    async find(): Promise<Role[]> {
        return this.roleRepository.find()
    }
}

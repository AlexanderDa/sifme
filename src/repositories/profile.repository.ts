import { DefaultCrudRepository } from '@loopback/repository'
import { Profile, ProfileRelations } from '../models'
import { SifmePgcDataSource } from '../datasources'
import { inject } from '@loopback/core'

export class ProfileRepository extends DefaultCrudRepository<
    Profile,
    typeof Profile.prototype.id,
    ProfileRelations
> {
    constructor(@inject('datasources.sifmePGC') dataSource: SifmePgcDataSource) {
        super(Profile, dataSource)
    }
}

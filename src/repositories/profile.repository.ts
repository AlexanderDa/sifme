import {
    DefaultCrudRepository,
    repository,
    HasOneRepositoryFactory
} from '@loopback/repository'
import { Profile, ProfileRelations, User } from '../models'
import { SifmePgcDataSource } from '../datasources'
import { inject, Getter } from '@loopback/core'
import { UserRepository } from './user.repository'

export class ProfileRepository extends DefaultCrudRepository<
    Profile,
    typeof Profile.prototype.id,
    ProfileRelations
> {
    public readonly user: HasOneRepositoryFactory<User, typeof Profile.prototype.id>

    constructor(
        @inject('datasources.sifmePGC') dataSource: SifmePgcDataSource,
        @repository.getter('UserRepository')
        protected userRepositoryGetter: Getter<UserRepository>
    ) {
        super(Profile, dataSource)
        this.user = this.createHasOneRepositoryFactoryFor('user', userRepositoryGetter)
        this.registerInclusionResolver('user', this.user.inclusionResolver)
    }
}

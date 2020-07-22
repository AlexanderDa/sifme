import {
    DefaultCrudRepository,
    repository,
    BelongsToAccessor
} from '@loopback/repository'
import { User, UserRelations, Profile } from '../models'
import { SifmePgcDataSource } from '../datasources'
import { inject, Getter } from '@loopback/core'
import { ProfileRepository } from './profile.repository'

export class UserRepository extends DefaultCrudRepository<
    User,
    typeof User.prototype.id,
    UserRelations
> {
    public readonly profile: BelongsToAccessor<Profile, typeof User.prototype.id>

    constructor(
        @inject('datasources.sifmePGC') dataSource: SifmePgcDataSource,
        @repository.getter('ProfileRepository')
        protected profileRepositoryGetter: Getter<ProfileRepository>
    ) {
        super(User, dataSource)
        this.profile = this.createBelongsToAccessorFor('profile', profileRepositoryGetter)
        this.registerInclusionResolver('profile', this.profile.inclusionResolver)
    }
}

export class SimpleUserRepository extends DefaultCrudRepository<
    User,
    typeof User.prototype.id,
    UserRelations
> {
    constructor(@inject('datasources.sifmePGC') dataSource: SifmePgcDataSource) {
        super(User, dataSource)
    }
}

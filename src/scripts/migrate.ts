import { repository } from '@loopback/repository'
import { inject } from '@loopback/core'
import { Application } from '../application'
import { SifmePgcDataSource } from '../datasources'
import { RoleRepository } from '../repositories'
import { SimpleUserRepository } from '../repositories'
import { ProfileRepository } from '../repositories'
import { Role, User } from '../models'
import { DEFAULT_ROLES } from '../configs'
import { DEFAULT_ADMIN } from '../configs'
import { BcryptHasher } from '../services'
import { PasswordBindings } from '../keys'

/**
 * Migrate defaults to the database
 */
class DefaultValues {
    @repository(RoleRepository) public roleRepo: RoleRepository
    @repository(ProfileRepository) public profileRepo: ProfileRepository
    @repository(SimpleUserRepository) public userRepo: SimpleUserRepository
    @inject(PasswordBindings.ROUNDS) private readonly rounds: number
    public bcrypt: BcryptHasher
    constructor() {
        this.roleRepo = new RoleRepository(new SifmePgcDataSource())
        this.profileRepo = new ProfileRepository(new SifmePgcDataSource())
        this.userRepo = new SimpleUserRepository(new SifmePgcDataSource())
        this.bcrypt = new BcryptHasher(this.rounds)
    }

    /**
     * Migrate defaults
     */
    public async migrate(): Promise<void> {
        await this.defaultRoles()
        await this.defaultAdmin()
    }

    /**
     * Migrate defaults user roles
     */
    private async defaultRoles(): Promise<void> {
        // Migrate roles
        for (const role of DEFAULT_ROLES) {
            if (!(await this.roleRepo.exists(role.id))) {
                const saved: Role = await this.roleRepo.create(role)
                console.log('migrated: ', saved)
            }
        }
    }

    /**
     * Migrate default admin user
     */
    private async defaultAdmin(): Promise<void> {
        if (!(await this.userRepo.exists(1))) {
            const admin: User = DEFAULT_ADMIN

            const profile = await this.profileRepo.create({
                createdBy: 0,
                firstName: 'admin',
                lastName: 'sifme',
                address: 'my address'
            })

            if (profile) {
                const password: string = admin.password
                admin.password = await this.bcrypt.encrypt(password)
                admin.profileId = profile.id ?? 0
                const saved: User = await this.userRepo.create(admin)

                console.log('migrated:  User', {
                    id: saved.id,
                    emailAddress: saved.email,
                    password,
                    profile: { lastName: profile.lastName, firstName: profile.firstName }
                })
            }
        }
    }
}

/**
 * Migrate defaults to the database
 */
export default async function migrate(args: string[]) {
    const existingSchema = args.includes('--rebuild') ? 'drop' : 'alter'
    console.log('Migrating schemas (%s existing schema)', existingSchema)

    //Migrate the database
    const app = new Application()
    await app.boot()
    await app.migrateSchema({ existingSchema })

    // Migrate default values
    const values: DefaultValues = new DefaultValues()
    await values.migrate()

    // Connectors usually keep a pool of opened connections,
    // this keeps the process running even after all work is done.
    // We need to exit explicitly.
    process.exit(0)
}

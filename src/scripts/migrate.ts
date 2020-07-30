import { inject } from '@loopback/core'
import { Application } from '../application'
import { RoleRepository, UserRepository } from '../repositories'
import { givenHttpServerConfig } from '@loopback/testlab'
import { ProfileRepository } from '../repositories'
import { Role, User } from '../models'
import { DEFAULT_ROLES } from '../configs'
import { DEFAULT_ADMIN } from '../configs'
import { BcryptHasher } from '../services'
import { PasswordBindings } from '../keys'

/**
 * Migrate defaults to the database
 */
class Migrate {
    private app: Application

    @inject(PasswordBindings.ROUNDS) private readonly rounds: number
    public bcrypt: BcryptHasher
    constructor() {
        this.bcrypt = new BcryptHasher(this.rounds)
    }

    /**
     * Migrate database schema and defaults
     */
    public async migrate(existingSchema: 'drop' | 'alter'): Promise<void> {
        await this.initApp()

        // Migrate schema
        await this.createDB(existingSchema)

        // Migrate defaults
        await this.saveDefaultRoles()
        await this.saveDefaultAdmin()

        await this.app.stop()
    }

    /**
     * Migrate database schema.
     * @param existingSchema
     */
    private async createDB(existingSchema: 'drop' | 'alter'): Promise<void> {
        await this.app.migrateSchema({ existingSchema })
    }

    /**
     * Migrate defaults user roles
     */
    private async saveDefaultRoles(): Promise<void> {
        const roleRepo: RoleRepository = await this.app.getRepository(RoleRepository)
        // Migrate roles
        for (const role of DEFAULT_ROLES) {
            if (!(await roleRepo.exists(role.id))) {
                const saved: Role = await roleRepo.create(role)
                console.log('migrated: ', saved)
            }
        }
    }

    /**
     * Migrate default admin user
     */
    private async saveDefaultAdmin(): Promise<void> {
        const userRepo: UserRepository = await this.app.getRepository(UserRepository)
        const profileRepo: ProfileRepository = await this.app.getRepository(
            ProfileRepository
        )
        if (!(await userRepo.exists(1))) {
            const admin: User = DEFAULT_ADMIN

            const profile = await profileRepo.create({
                createdBy: 0,
                firstName: 'admin',
                lastName: 'sifme',
                email: admin.email,
                address: 'my address'
            })

            if (profile) {
                const password: string = admin.password
                admin.password = await this.bcrypt.encrypt(password)
                admin.profileId = profile.id ?? 0
                const saved: User = await userRepo.create(admin)

                console.log('migrated:  User', {
                    id: saved.id,
                    emailAddress: saved.email,
                    password,
                    profile: { lastName: profile.lastName, firstName: profile.firstName }
                })
            }
        }
    }

    /**
     * Init the application
     */
    private async initApp(): Promise<void> {
        const restConfig = givenHttpServerConfig({})

        const app = new Application({
            rest: restConfig
        })

        await app.boot()
        await app.start()

        this.app = app
    }
}

/**
 * Migrate defaults to the database
 */
export default async function migrate(args: string[]) {
    const existingSchema = args.includes('--rebuild') ? 'drop' : 'alter'
    console.log('Migrating schemas (%s existing schema)', existingSchema)

    await new Migrate().migrate(existingSchema)

    // Connectors usually keep a pool of opened connections,
    // this keeps the process running even after all work is done.
    // We need to exit explicitly.
    process.exit(0)
}

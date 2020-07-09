// Uncomment these imports to begin using these cool features!
import { inject } from '@loopback/core'
import { requestBody, post, get, HttpErrors } from '@loopback/rest'
import { TokenService } from '@loopback/authentication'
import { UserService } from '@loopback/authentication'
import { authenticate } from '@loopback/authentication'
import { SecurityBindings } from '@loopback/security'
import { UserProfile } from '@loopback/security'
import { repository } from '@loopback/repository'
import { Credentials } from 'crypto'
import { TokenBindings } from '../keys'
import { UserBindings } from '../keys'
import { AccountBindings } from '../keys'
import { PasswordBindings } from '../keys'
import { User } from '../models'
import { AccountService } from '../services'
import { DecryptedHasher } from '../services'
import * as spect from './spects/account.spect'
import { UserRepository } from '../repositories'

export class AccountController {
    constructor(
        @inject(TokenBindings.SERVICE) public jwtService: TokenService,
        @inject(PasswordBindings.HASHER) public bcrypt: DecryptedHasher,
        @inject(AccountBindings.SERVICE) public acountService: AccountService,
        @inject(UserBindings.SERVICE)
        public userService: UserService<User, Credentials>,
        @repository(UserRepository) public userRepo: UserRepository
    ) {}

    @post('/api/account/login', spect.logged())
    async login(
        @requestBody(spect.login())
        credentials: Credentials
    ): Promise<{ token: string }> {
        // ensure the user exists, and the password is correct
        const user = await this.userService.verifyCredentials(credentials)

        // convert a User object into a UserProfile object (reduced set of properties)
        const userProfile = this.userService.convertToUserProfile(user)

        // create a JSON Web Token based on the user profile
        const token = await this.jwtService.generateToken(userProfile)

        return { token }
    }

    @post('/api/account/activate', spect.logged())
    async activate(
        @requestBody(spect.toActivate()) verifier: Verifier
    ): Promise<{ token: string }> {
        let token = ''
        const user = await this.userRepo.findOne({
            where: { email: verifier.email }
        })
        if (user) {
            if (user.verificationToken === verifier.verificationToken) {
                //activate account
                await this.userRepo.updateById(user.id, {
                    emailVerified: true,
                    verificationToken: '',
                    password: await this.bcrypt.encrypt(verifier.password)
                })

                // convert a User object into a UserProfile object (reduced set of properties)
                const userProfile = this.userService.convertToUserProfile(user)

                // create a JSON Web Token based on the user profile
                token = await this.jwtService.generateToken(userProfile)
            } else {
                throw new HttpErrors.Unauthorized('BAD_TOKEN')
            }
        } else {
            throw new HttpErrors.BadRequest('BAD_ACCOUNT')
        }
        return { token }
    }

    @authenticate('jwt')
    @get('/api/account/me', spect.me())
    async currentUser(
        @inject(SecurityBindings.USER) profile: UserProfile
    ): Promise<User> {
        return this.acountService.convertToUser(profile)
    }
}

type Verifier = {
    email: string
    verificationToken: string
    password: string
}

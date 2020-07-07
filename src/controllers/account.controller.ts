// Uncomment these imports to begin using these cool features!
import {inject} from '@loopback/core';
import {requestBody, post, get} from '@loopback/rest';
import {TokenService} from '@loopback/authentication';
import {UserService} from '@loopback/authentication';
import {authenticate} from '@loopback/authentication';
import {SecurityBindings} from '@loopback/security';
import {UserProfile} from '@loopback/security';
import {Credentials} from 'crypto';
import {TokenBindings, UserBindings, AccountBindings} from '../keys';
import {User} from '../models';
import {AccountService} from '../services';
import * as spect from './spects/account.spect';

export class AccountController {
  constructor(
    @inject(TokenBindings.SERVICE) public jwtService: TokenService,
    @inject(AccountBindings.SERVICE)
    public acountService: AccountService,
    @inject(UserBindings.SERVICE)
    public userService: UserService<User, Credentials>,
  ) {}

  @post('/api/account/login', spect.logged())
  async login(
    @requestBody(spect.login())
    credentials: Credentials,
  ): Promise<{token: string}> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials);

    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);

    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);

    return {token};
  }

  @get('/api/account/me', spect.me())
  @authenticate('jwt')
  async currentUser(
    @inject(SecurityBindings.USER) profile: UserProfile,
  ): Promise<User> {
    return this.acountService.convertToUser(profile);
  }
}

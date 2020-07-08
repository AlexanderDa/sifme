import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {post, requestBody} from '@loopback/rest';
import {UserRepository} from '../repositories';
import * as spect from './spects/email.spect';
import {authenticate} from '@loopback/authentication';
import {EmailService} from '../services';
import {EmailBindings} from '../keys';

@authenticate('jwt')
export class EmailController {
  constructor(
    @inject(EmailBindings.SERVICE) public emailService: EmailService,
    @repository(UserRepository) public userRepo: UserRepository,
  ) {}

  @post('/api/email/welcome', spect.response())
  async create(
    @requestBody(spect.email()) {email}: {email: string},
  ): Promise<void> {
    const user = await this.userRepo.findOne({where: {email}});
    if (user) {
      await this.emailService.welcome(
        user.email,
        user.email,
        user.verificationToken,
      );
    } else {
      throw new HttpErrors.BadRequest('BAD_ACCOUNT');
    }
  }
}

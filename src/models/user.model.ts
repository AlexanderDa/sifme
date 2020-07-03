import {model, property} from '@loopback/repository';
import {Base} from '.';

@model({
  name: 'dbuser',
  settings: {
    hiddenProperties: ['password', 'passwordResetToken'],
    foreignKeys: {},
    indexes: {
      uniqueEmail: {
        keys: {emailAddress: 1},
        options: {unique: true},
      },
      uniquePasswordResetTokenCode: {
        keys: {passwordResetToken: 1},
        options: {unique: true},
      },
      uniqueConfirmationCode: {
        keys: {confirmationCode: 1},
        options: {unique: true},
      },
    },
  },
})
export class User extends Base {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    length: 50,
    postgresql: {
      dataType: 'character varying',
      dataLength: 50,
    },
  })
  emailAddress: string;

  @property({
    type: 'string',
    required: false,
    length: 75,
    postgresql: {
      dataType: 'character varying',
      dataLength: 75,
    },
  })
  password: string;

  @property({
    type: 'boolean',
    default: false,
  })
  confirmed?: boolean;

  @property({
    type: 'string',
    required: false,
    length: 20,
    postgresql: {
      dataType: 'character varying',
      dataLength: 20,
    },
  })
  confirmationCode: string;

  @property({
    type: 'boolean',
    default: true,
  })
  isActive?: boolean;

  @property({
    type: 'string',
    length: 75,
    postgresql: {
      dataType: 'character varying',
      dataLength: 75,
    },
  })
  image?: string;

  @property({
    type: 'string',
  })
  passwordResetToken?: string;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;

import {OperationObject} from '@loopback/rest';
import {getModelSchemaRef} from '@loopback/rest';
import {RequestBodyObject} from '@loopback/rest';
import {User} from '../../models';
import {OPERATION_SECURITY_SPEC} from '../../auth';

/**
 * specifications to response a created user.
 */
export function created(): OperationObject {
  return {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(User)}},
      },
    },
  };
}

/**
 * Specifications to request a new user
 */
export function toCreate(): RequestBodyObject {
  return {
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, {
          title: 'NewUser',
          exclude: [
            'createdAt',
            'createdBy',
            'deleted',
            'deletedAt',
            'deletedBy',
            'id',
            'image',
            'password',
            'isActive',
            'emailVerified',
            'passwordResetToken',
            'verificationToken',
          ],
        }),
      },
    },
  };
}

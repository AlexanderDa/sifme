import { OperationObject } from '@loopback/rest'
import { RequestBodyObject } from '@loopback/rest'
import { OPERATION_SECURITY_SPEC } from '../../auth'

/**
 * specifications to response.
 */
export function response(): OperationObject {
    return {
        security: OPERATION_SECURITY_SPEC,
        responses: {
            '200': {}
        }
    }
}

/**
 * Specifications to request a welcome email
 */
export function email(): RequestBodyObject {
    return {
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    required: ['email'],
                    properties: {
                        email: {
                            type: 'string',
                            format: 'email'
                        }
                    }
                }
            }
        }
    }
}

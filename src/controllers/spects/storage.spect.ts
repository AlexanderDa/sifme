import { OperationObject } from '@loopback/rest'
import { OPERATION_SECURITY_SPEC } from '../../auth'

/**
 * specifications to response the file url.
 */
export function responseOneUrl(): OperationObject {
    return {
        security: OPERATION_SECURITY_SPEC,
        responses: {
            200: {
                content: {
                    'application/json': {
                        schema: {
                            properties: {
                                url: { type: 'string' }
                            }
                        }
                    }
                },
                description: 'Image uploaded'
            }
        }
    }
}

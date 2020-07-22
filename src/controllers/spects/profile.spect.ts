import { OperationObject } from '@loopback/rest'
import { RequestBodyObject } from '@loopback/rest'
import { SpectScheme } from './Spect'
import { responseCountSchema } from './Spect'
import { responseSimpleSchema } from './Spect'
import { requestBodySchema } from './Spect'
import { responseOneSchema } from './Spect'
import { responsePatchCountSchema } from './Spect'
import { responseListSchema } from './Spect'
import { Profile } from '../../models'

class ProfileSpect implements SpectScheme {
    /**
     * Specifications to request a body.
     */
    requestBody(): RequestBodyObject {
        return requestBodySchema(Profile, {
            exclude: [
                'createdAt',
                'createdBy',
                'deleted',
                'deletedAt',
                'deletedBy',
                'id',
                'image'
            ]
        })
    }

    /**
     * Specifications to request partial body.
     */
    requestPartialBoby(): RequestBodyObject {
        return requestBodySchema(Profile, {
            partial: true,
            exclude: ['createdAt', 'createdBy', 'deleted', 'deletedAt', 'deletedBy', 'id']
        })
    }

    /**
     * Specifications to response total of profiles.
     */
    responseCount(): OperationObject {
        return responseCountSchema(Profile)
    }

    /**
     * Specifications to response one profile.
     */
    responseOne(): OperationObject {
        return responseOneSchema(Profile, {
            includeRelations: true,
            exclude: []
        })
    }

    /**
     * Specifications to response array of profiles.
     */
    responseList(): OperationObject {
        return responseListSchema(Profile, { includeRelations: true })
    }

    /**
     * Specifications to response count of profiles updates.
     */
    responsePatchCount(): OperationObject {
        return responsePatchCountSchema(Profile)
    }

    /**
     * Specifications to response 204 status.
     * @param method methods allowed PATCH, PUT, DELETE
     */
    responseSimple(method: 'PATCH' | 'PUT' | 'DELETE'): OperationObject {
        return responseSimpleSchema(Profile, method)
    }
}

export default new ProfileSpect()

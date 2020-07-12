import { responseListSchema } from './Spect'
import { OperationObject } from '@loopback/rest'
import { Role } from '../../models'

class RoleSpect {
    responseList(): OperationObject {
        return responseListSchema(Role)
    }
}

export default new RoleSpect()

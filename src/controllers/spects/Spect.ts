import { OperationObject } from '@loopback/rest'
import { getModelSchemaRef } from '@loopback/rest'
import { JsonSchemaOptions } from '@loopback/rest'
import { RequestBodyObject } from '@loopback/rest'
import { OPERATION_SECURITY_SPEC } from '../../auth'
import { CountSchema } from '@loopback/repository'

export function requestBodySchema<M extends object>(
    model: Function & { prototype: M },
    options: JsonSchemaOptions<M>
): RequestBodyObject {
    return {
        content: {
            'application/json': {
                schema: getModelSchemaRef(model, options)
            }
        }
    }
}

export function responseCountSchema<M extends object>(
    model: Function & { prototype: M }
): OperationObject {
    return {
        security: OPERATION_SECURITY_SPEC,
        responses: {
            '200': {
                description: `${model.name} model count.`,
                content: { 'application/json': { schema: CountSchema } }
            }
        }
    }
}

export function responseOneSchema<M extends object>(
    model: Function & { prototype: M },
    options?: JsonSchemaOptions<M>
): OperationObject {
    return {
        security: OPERATION_SECURITY_SPEC,
        responses: {
            '200': {
                description: `${model.name} model instance`,
                content: {
                    'application/json': { schema: getModelSchemaRef(model, options) }
                }
            }
        }
    }
}

export function responsePatchCountSchema<M extends object>(
    model: Function & { prototype: M }
): OperationObject {
    return {
        security: OPERATION_SECURITY_SPEC,
        responses: {
            '200': {
                description: `${model.name} PATCH success count`,
                content: { 'application/json': { schema: CountSchema } }
            }
        }
    }
}

export function responseDeleteCountSchema(model: string): OperationObject {
    return {
        security: OPERATION_SECURITY_SPEC,
        responses: {
            '200': {
                description: `${model} DELETE success count`,
                content: { 'application/json': { schema: CountSchema } }
            }
        }
    }
}

export function responseListSchema<M extends object>(
    model: Function & { prototype: M },
    options?: JsonSchemaOptions<M>
): OperationObject {
    return {
        security: OPERATION_SECURITY_SPEC,
        responses: {
            '200': {
                description: `Array of ${model.name} model instances`,
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: getModelSchemaRef(model, options)
                        }
                    }
                }
            }
        }
    }
}

export function responseSimpleSchema<M extends object>(
    model: Function & { prototype: M },
    method: string
): OperationObject {
    return {
        security: OPERATION_SECURITY_SPEC,
        responses: {
            '204': {
                description: `${model.name} ${method} success`
            }
        }
    }
}

export interface SpectScheme {
    requestBody(): RequestBodyObject
    requestPartialBoby(): RequestBodyObject

    responseCount(): OperationObject
    responseOne(): OperationObject
    responseList(): OperationObject
    responsePatchCount(): OperationObject
    responseSimple(method: 'PATCH' | 'PUT' | 'DELETE'): OperationObject
}

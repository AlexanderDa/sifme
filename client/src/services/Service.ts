// eslint-disable-next-line
// @ts-ignore
export { Http } from 'vue-resource'
import { Filter, Where, AnyObject } from '@/utils/query'

export default interface Service<E extends AnyObject> {
    create(element: Partial<E>): Promise<E>
    count(where?: Where<E>): Promise<number>
    find(filter?: Filter<E>): Promise<E[]>
    findById(id: number, filter?: Filter<E>): Promise<E>
    updateById(id: number, element: Partial<E>): Promise<boolean>
    replaceById(id: number, element: E): Promise<boolean>
    deleteById(id: number): Promise<boolean>
}

/**
 * Complete url to make a request
 * @param endpoit api url
 * @param options extra options
 */
export function api(
    endpoit: string,
    options?: { id?: number; filter?: object; where?: object }
): string {
    let baseUrl = `${process.env.BASE_URL ?? ''}api${endpoit}`
    if (options) {
        if (options.id) {
            baseUrl = `${baseUrl}/${options.id}`
        }

        if (options.filter) {
            baseUrl = `${baseUrl}?filter=${encodeURI(JSON.stringify(options.filter))}`
        }

        if (options.where) {
            baseUrl = `${baseUrl}?where=${encodeURI(JSON.stringify(options.where))}`
        }
    }
    return baseUrl
}

/**
 * Format null or empty data of an http request body.
 * @param model model to format
 */
// eslint-disable-next-line
export function formatData(model: any): object {
    const keys = Object.keys(model)
    keys.forEach(item => {
        if (
            model[item] === undefined ||
            model[item] === null ||
            model[item] === '' ||
            model[item] === 0
        )
            model[item] = undefined
    })
    return model
}
export interface HttpResponse {
    // eslint-disable-next-line
    data: any
    ok: boolean
    status: number
    statusText: string
    headers: Function
    text(): string
    // eslint-disable-next-line
    json(): any
    blob(): Blob
}

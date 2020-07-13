// eslint-disable-next-line
// @ts-ignore
export { Http } from 'vue-resource'
import { Filter } from '@/utils/filter'

export default interface Service<E, F> {
    create(element: E): Promise<E>
    count(): Promise<number>
    find(filter?: Filter<F>): Promise<E[]>
    findById(id: number): Promise<E>
    updateById(element: E): Promise<boolean>
    deleteById(id: number): Promise<boolean>
    formBody(element: E): E
}

export function api(endpoit: string): string {
    return `${process.env.BASE_URL ?? ''}api${endpoit}`
}
export interface HttpResponse {
    data: object
    ok: boolean
    status: number
    statusText: string
    headers: Function
    text(): string
    // eslint-disable-next-line
    json(): Promise<any>
    blob(): Blob
}

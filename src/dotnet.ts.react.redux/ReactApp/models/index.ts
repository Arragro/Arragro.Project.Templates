export * from './TodoModel'

export interface IFetchResult<T> {
    status: any
    ok: boolean
    data: T | null
}

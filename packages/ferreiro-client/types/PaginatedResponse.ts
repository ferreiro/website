export interface Pagination {
    total: number
    limit: number
    page: number
    pages: number
}

export interface PaginatedResponse<T> extends Pagination {
    docs: T[]
}

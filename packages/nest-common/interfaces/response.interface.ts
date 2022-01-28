/**
 * 分页查询返回结果
 */
export interface pageQueryResponse<T>{
    list: T,
    count: number|string,
    currentPage: number|string,
    pageSize: number|string
}

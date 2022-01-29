export enum ResponseCode {
    // 请求处理失败
    FAIL = -1,
    // 数据库无记录
    DB_NO_RECORD = 200404,
    // 数据库已存在
    DB_EXISTS = 200200,
    // 密码错误
    PWD_ERROR = 200501,
    // 参数错误
    PARAM_ERROR = 404001
}

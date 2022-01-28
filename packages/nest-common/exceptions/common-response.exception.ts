import { HttpException, HttpStatus } from "@nestjs/common";
import { ResponseCode } from "../enums/response-code.enum";

export class CommonResponseException extends HttpException {
    constructor(
        description = 'Service Error',
        statusCode:ResponseCode = ResponseCode.FAIL,
        objectOrError?: string | object | any,
    ){
        super(
            HttpException.createBody(
                objectOrError,
                description,
                statusCode
            ),
            statusCode
        );
    }
}

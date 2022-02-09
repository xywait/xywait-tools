import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from "@nestjs/common";
import { Request, Response } from 'express';
import { execPath } from 'process';
import { CommonResponseException } from "../exceptions/common-response.exception";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException|CommonResponseException, host: ArgumentsHost) {
        console.log("exception:",exception)
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        //const message = exception.getResponse();
        const exceptionResponse: string | Record<string, any> = exception.getResponse();
        let message = typeof exceptionResponse === 'object' ? exceptionResponse.message : exceptionResponse;


        if(exception instanceof CommonResponseException){
            response
            .status(200)
            .json({
                data: null,
                code: status,
                message
            })
        }else{
            response
            .status(status)
            .json({
                data: null,
                code: status,
                message
            })
        }


    }
}

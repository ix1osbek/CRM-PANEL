import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { Request, Response } from 'express'

@Catch()
export class AppErrorFilter implements ExceptionFilter {
  catch(error: unknown, context: ArgumentsHost) {
    const httpCtx = context.switchToHttp()
    const res = httpCtx.getResponse<Response>()
    const req = httpCtx.getRequest<Request>()

    const statusCode =
      error instanceof HttpException
        ? error.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    const errorMsg =
      error instanceof HttpException
        ? error.getResponse()
        : 'Unexpected server failure'

    res.status(statusCode).json({
      success: false,
      statusCode,
      message: errorMsg,
      time: new Date().toISOString(),
      route: req.url,
    })
  }
}

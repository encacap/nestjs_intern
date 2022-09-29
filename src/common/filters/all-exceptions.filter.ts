import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    let responseErrors = [];
    let responseErrorStack = [];

    if (exception instanceof HttpException) {
      responseErrors = exception.getResponse()['errors'];
    } else if (exception instanceof Error) {
      responseErrorStack = exception.stack.split('\n').map((line) => line.trim());
    }

    const responseMessage = exception instanceof Error ? exception.message : exception;
    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message: responseMessage,
      errors: responseErrors,
      ...(httpStatus === HttpStatus.INTERNAL_SERVER_ERROR && { stack: responseErrorStack }),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}

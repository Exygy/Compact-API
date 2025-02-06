import { ArgumentsHost, Catch, Logger } from '@nestjs/common';
import { AbstractHttpAdapter, BaseExceptionFilter } from '@nestjs/core';

/**
 * @description This creates a simple custom catch all exception filter for us. As for right now its just a pass through, but can be used for managing errors. All errors will flow through here
 */
@Catch()
export class CustomExceptionFilter extends BaseExceptionFilter {
  logger: Logger;
  constructor(httpAdapter: AbstractHttpAdapter, logger: Logger) {
    super(httpAdapter);
    this.logger = logger;
  }
  catch(exception: any, host: ArgumentsHost) {
    this.logger.error({
      message: exception?.response?.message,
      stack: exception.stack,
      exception,
    });
    super.catch(exception, host);
  }
}

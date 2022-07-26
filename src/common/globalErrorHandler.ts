import { ArgumentsHost, BadRequestException, ConflictException, Global, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core/exceptions/base-exception-filter";

@Global()
@Injectable()
export class GlobalErrorHandler extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    super.catch(exception, host)
  }

  handle(error: any) {
    console.log(error);
    if (error instanceof ConflictException) {
      throw error
    } else if (error?.original?.code === '23503')
      throw new NotFoundException()
    else if (error instanceof BadRequestException) {
      throw error
    } else
      throw new InternalServerErrorException()
  }
}

const errHandler = new GlobalErrorHandler()

export default errHandler
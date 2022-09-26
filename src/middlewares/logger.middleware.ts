import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(_req: Request, _res: Response, next: NextFunction) {
    console.log('LoggerMiddleware');
    next();
  }
}

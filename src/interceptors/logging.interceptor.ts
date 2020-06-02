import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(
            `${req.method} ${req.url} - ${res.statusCode} (${
              Date.now() - now
            }ms)`,
          ),
        ),
      );
  }
}

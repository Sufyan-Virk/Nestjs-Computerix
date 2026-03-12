import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
  meta: {
      timestamp: string;
      success: boolean;
  }
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    // Intercept response stream and transform leaving API data
    return next.handle().pipe(
        map(data => ({
            data,
            meta: {
                timestamp: new Date().toISOString(),
                success: true,
            }
        }))
    );
  }
}

import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs';

export default class CustomInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler) {
    console.log({ context });
    return handler.handle().pipe(
      map((data) => {
        console.log({ context });
        return data;
      }),
    );
  }
}

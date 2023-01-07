import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * @param data
 * @param context
 */

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user || null;
  }
);

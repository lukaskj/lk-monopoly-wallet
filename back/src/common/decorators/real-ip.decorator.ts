import { getClientIp } from "@supercharge/request-ip";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const RealIP = createParamDecorator((_, ctx: ExecutionContext): string | undefined => {
  const request = ctx.switchToHttp().getRequest();
  return getClientIp(request);
});

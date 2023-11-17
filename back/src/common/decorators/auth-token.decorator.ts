import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { isNullOrUndefined } from "../helpers/is-null-or-undefined";

export const AuthToken = createParamDecorator((_, ctx: ExecutionContext): string => {
  const request = ctx.switchToHttp().getRequest();
  if (!isNullOrUndefined(request.headers) && "authorization" in request.headers) {
    return request.headers["authorization"].replace("Bearer ", "").trim();
  }
  return "";
});

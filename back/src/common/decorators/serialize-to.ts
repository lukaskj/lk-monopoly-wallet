import { UseInterceptors } from "@nestjs/common";
import { SerializeInterceptor } from "../interceptors/serialize-interceptor";
import { ClassConstructor } from "../types";

export function SerializeTo<T>(cls: ClassConstructor<T>): MethodDecorator & ClassDecorator {
  return UseInterceptors(new SerializeInterceptor(cls));
}

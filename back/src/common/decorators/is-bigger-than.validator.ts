/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
// file validators/is-bigger-than.ts
import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

export function IsBiggerThan(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string): void {
    registerDecorator({
      name: "isBiggerThan",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return typeof value === "number" && typeof relatedValue === "number" ? value >= relatedValue : true;
        },
      },
    });
  };
}

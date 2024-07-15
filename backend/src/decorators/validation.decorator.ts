import { JoiRequestValidationError } from '@/middleware/errorMiddleware';
import { Request } from 'express';
import { ObjectSchema } from 'joi';

type IJoiDecorator = (
  target: any,
  key: string,
  descriptor: PropertyDescriptor
) => void;

//Decorator is just like higher order function but syntx sugar
export const joiValidator = (schema: ObjectSchema): IJoiDecorator => {
  //Key gives name of method in which decorator is used, descriptor gives information about method and it's properties
  return (_target: any, key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      // change desc value to validate
      const req: Request = args[0];
      const { error } = await Promise.resolve(schema.validate(req.body));
      if (error?.details) {
        throw new JoiRequestValidationError(error.details[0].message);
      }
      return originalMethod.apply(this, args); // calls original method if everything is ok
    };
    return descriptor;
  };
};

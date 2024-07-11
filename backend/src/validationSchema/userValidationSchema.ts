import Joi, { ObjectSchema } from 'joi';

class UserValidationSchema {
  public static registerSchema: ObjectSchema = Joi.object().keys({
    name: Joi.string().required().min(4).max(20).messages({
      'string.base': 'Name must be a string',
      'string.min': 'Min 4 characters for name',
      'string.max': 'Max 20 characters for name',
      'string.empty': 'Name is a required field',
    }),
    email: Joi.string().required().email().messages({
      'string.base': 'Email must be a string',
      'string.email': 'Email must be valid',
      'string.empty': 'Email is a required field',
    }),
    password: Joi.string().min(8).max(20).required(),
  });
  public static loginSchema: ObjectSchema = Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.base': 'Email must be a string',
      'string.email': 'Email must be valid',
      'string.empty': 'Email is a required field',
    }),
    password: Joi.string().required(),
  });
}

export default UserValidationSchema;

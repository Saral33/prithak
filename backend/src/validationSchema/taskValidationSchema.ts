import Joi, { ObjectSchema } from 'joi';

class TaskValidationSchema {
  public static createTaskSchema: ObjectSchema = Joi.object().keys({
    title: Joi.string().required().messages({
      'string.base': 'Title must be a string',
      'string.empty': 'Title is a required field',
    }),
    description: Joi.string().required().messages({
      'string.base': 'Description must be a string',
      'string.empty': 'Description is a required field',
    }),
    status: Joi.string()
      .required()
      .valid('pending', 'inprogress', 'completed')
      .messages({
        'string.base': 'Status must be a string',
        'string.empty': 'Status is a required field',
        'string.only':
          'Status must be one of the following: pending, inprogress, completed',
      }),
    deadline: Joi.date().required().greater('now').messages({
      'string.base': 'Deadline must be a date',
      'string.empty': 'Deadline is a required field',
    }),
    priority: Joi.string().required().valid('low', 'medium', 'high').messages({
      'string.base': 'Priority must be a string',
      'string.empty': 'Priority is a required field',
      'string.only': 'Priority must be one of the following: low, medium, high',
    }),
  });

  public static updateTaskSchema: ObjectSchema = Joi.object().keys({
    title: Joi.string().messages({
      'string.base': 'Title must be a string',
    }),
    description: Joi.string().messages({
      'string.base': 'Description must be a string',
    }),
    status: Joi.string().valid('pending', 'inprogress', 'completed').messages({
      'string.base': 'Status must be a string',
      'string.only':
        'Status must be one of the following: pending, inprogress, completed',
    }),
    deadline: Joi.date().greater('now').messages({
      'string.base': 'Deadline must be a date',
    }),
    priority: Joi.string().valid('low', 'medium', 'high').messages({
      'string.base': 'Priority must be a string',
      'string.only': 'Priority must be one of the following: low, medium, high',
    }),
  });
}

export default TaskValidationSchema;

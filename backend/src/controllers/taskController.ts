import { joiValidator } from '@/decorators/validation.decorator';
import { ICreateTaskInterface } from '@/interfaces/task.interface';
import { BadRequestError } from '@/middleware/errorMiddleware';
import { TaskRepositoryInstance } from '@/repositories/taskRepository';
import TaskValidationSchema from '@/validationSchema/taskValidationSchema';
import { Request, Response } from 'express';
export class TaskController {
  @joiValidator(TaskValidationSchema.createTaskSchema)
  public async createTask(
    req: Request<{}, {}, ICreateTaskInterface>,
    res: Response
  ) {
    const { title, description, status, deadline, priority } = req.body;
    const task = await TaskRepositoryInstance.create({
      title,
      description,
      status,
      deadline,
      priority,
      userId: req?.currentUserId!,
    });
    if (!task) {
      throw new BadRequestError('Some internal error');
    }
    res.status(200).json({
      status: 'success',
      message: 'Task created successfully',
    });
  }

  public async getAllTask(req: Request, res: Response) {
    const tasks = await TaskRepositoryInstance.getAll(req.currentUserId!);
    res.status(200).json({
      status: 'success',
      data: tasks,
    });
  }

  public async deleteTask(req: Request, res: Response) {
    const idToDelete = req?.params?.id;
    if (!idToDelete) throw new BadRequestError('Delete Id is required');
    const response = await TaskRepositoryInstance.deleteOne(
      idToDelete,
      req.currentUserId!
    );
    if (response) {
      res.status(200).json({
        status: 'success',
        message: 'Task deleted successfully',
      });
    }
  }
  @joiValidator(TaskValidationSchema.updateTaskSchema)
  public async updateTask(req: Request, res: Response) {
    const idToUpdate = req?.params?.id;
    if (!idToUpdate) throw new BadRequestError('Update Id is required');
    const response = await TaskRepositoryInstance.updateOne(
      idToUpdate,
      req.body,
      req.currentUserId!
    );
    if (response) {
      res.status(200).json({
        status: 'success',
        message: 'Task updated successfully',
      });
    }
  }
}

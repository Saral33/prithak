import { joiValidator } from '@/decorators/validation.decorator';
import { ICreateTaskInterface } from '@/interfaces/task.interface';
import { BadRequestError } from '@/middleware/errorMiddleware';
import { SearchRepositoryInstance } from '@/repositories/searchRepository';
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
    await SearchRepositoryInstance.save(task);

    if (!task) {
      throw new BadRequestError('Some internal error');
    }
    res.status(200).json({
      status: 'success',
      message: 'Task created successfully',
    });
  }

  public async getAllTask(
    req: Request<
      {},
      {},
      {},
      { limit?: number; page?: number; sortBy?: string }
    >,
    res: Response
  ) {
    const { limit, page, sortBy } = req?.query;

    const { task, total, totalPages } = await TaskRepositoryInstance.getAll(
      req.currentUserId!,
      limit,
      page,
      sortBy
    );
    res.status(200).json({
      status: 'success',
      data: task,
      total,
      totalPages,
    });
  }

  public async deleteTask(req: Request, res: Response) {
    const idToDelete = req?.params?.id;
    if (!idToDelete) throw new BadRequestError('Delete Id is required');
    const response = await TaskRepositoryInstance.deleteOne(
      idToDelete,
      req.currentUserId!
    );
    await SearchRepositoryInstance.delete(idToDelete, req.currentUserId!);
    if (response) {
      res.status(200).json({
        status: 'success',
        message: 'Task deleted successfully',
      });
    }
  }

  public async getTaskDetail(req: Request, res: Response) {
    const taskId = req?.params?.id;
    if (!taskId) throw new BadRequestError('Task Id is required');
    const response = await TaskRepositoryInstance.getById(
      taskId,
      req.currentUserId!
    );
    if (response) {
      res.status(200).json({
        status: 'success',
        data: response,
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
    await SearchRepositoryInstance.delete(idToUpdate, req.currentUserId!);
    await SearchRepositoryInstance.save(response);
    if (response) {
      res.status(200).json({
        status: 'success',
        message: 'Task updated successfully',
      });
    }
  }

  public async searchTask(req: Request, res: Response) {
    const query = req?.params?.q;
    if (!query) throw new BadRequestError('Search query is required');
    const response = await SearchRepositoryInstance.search(
      query as string,
      req.currentUserId!
    );
    res.status(200).json({
      status: 'success',
      data: response,
    });
  }
}

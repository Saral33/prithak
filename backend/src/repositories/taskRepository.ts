import {
  ICreateTaskInterface,
  ITaskInterface,
} from '@/interfaces/task.interface';
import { BadRequestError } from '@/middleware/errorMiddleware';
import { TaskModal } from '@/model/taskModal';

class TaskRepository {
  public async create(task: ITaskInterface) {
    const { title, description, status, deadline, priority, userId } = task;

    const newTask = await TaskModal.create<ICreateTaskInterface>({
      title,
      description,
      status,
      deadline,
      priority,
      userId,
    });
    return newTask;
  }

  public async getAll(userId: string) {
    const task = await TaskModal.find({ userId });
    return task;
  }

  public async deleteOne(id: string, userId: string) {
    const res = await TaskModal.findOneAndDelete({ _id: id, userId });
    if (!res) {
      throw new BadRequestError('Could not find task with that id');
    }
    return res;
  }

  public async updateOne(id: string, task: ITaskInterface, userId: string) {
    const updatedTask = task;
    delete updatedTask._id;
    delete updatedTask.userId;

    const res = await TaskModal.findOneAndUpdate({ _id: id, userId }, task, {
      new: true,
    });
    if (!res) {
      throw new BadRequestError('Could not find task with that id');
    }
    return res;
  }
}

export const TaskRepositoryInstance = new TaskRepository();

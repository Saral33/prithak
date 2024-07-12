import { ITaskInterface } from '@/interfaces/task.interface';
import { Model, model, Schema } from 'mongoose';

const taskSchema = new Schema<ITaskInterface>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'inprogress', 'completed'],
    default: 'pending',
  },
  deadline: {
    type: Date,
    required: true,
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'low',
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const TaskModal: Model<ITaskInterface> = model<ITaskInterface>(
  'Task',
  taskSchema,
  'Task'
);
export { TaskModal };

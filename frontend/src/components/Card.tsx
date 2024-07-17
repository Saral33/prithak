import Icons from '@/components/Icons';

interface ICardProps {
  id: string;
  title: string;
  description: string;
  status: string;
  deadline: Date;
  priority: string;
  deleteTask?: () => void;
  editTask?: () => void;
}

const Card = ({
  title,
  description,
  status,
  deadline,
  priority,
  deleteTask,
  editTask,
}: ICardProps) => {
  return (
    <div className="w-full h-full relative">
      <div className="absolute top-2 right-1">
        <div className="flex gap-1">
          {editTask && (
            <Icons onClick={editTask} className="cursor-pointer" name="Edit" />
          )}
          {deleteTask && (
            <Icons
              onClick={deleteTask}
              className="cursor-pointer"
              name="Delete"
            />
          )}
        </div>
      </div>
      <div className="w-full h-full space-y-3 px-3 py-4 shadow-xl bg-[#D1EAEC]">
        <h1 className="text-xl mt-5">{title}</h1>
        <p>{description}</p>
        <p>Priority: {priority}</p>
        <p>Status: {status}</p>
        <p>Deadline: {`${deadline}`.split('T')[0]}</p>
      </div>
    </div>
  );
};

export default Card;

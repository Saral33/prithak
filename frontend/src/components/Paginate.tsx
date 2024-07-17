import Button from '@/components/Button';

interface IProps {
  page: number;
  setPage: (value: number) => void;
  total: number;
}

const Paginate = ({ page, setPage, total }: IProps) => {
  return (
    <div className="flex w-full overflow-x-auto">
      {total > 1 &&
        [...Array(total)].map((_, index) => (
          <Button
            className={`${page === index + 1 ? 'bg-primary' : 'bg-gray-600'}`}
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
    </div>
  );
};

export default Paginate;

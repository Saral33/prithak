interface IProps {
  value: string;
  setValue: (value: string) => void;
}
const SeacrhBar = ({ value, setValue }: IProps) => {
  return (
    <div className="w-full">
      <input
        placeholder="Search task using title or description"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border border-grey-light w-full p-3 rounded mb-1"
      />
    </div>
  );
};

export default SeacrhBar;

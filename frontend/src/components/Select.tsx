/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';

type ControlledSelectProps<TFieldValues extends FieldValues> = {
  useControlled: true;
  value: string;
  setValue: (value: string) => void;
  register?: UseFormRegister<TFieldValues>;
};

type UncontrolledSelectProps<TFieldValues extends FieldValues> = {
  useControlled?: false;
  value?: string;
  setValue?: (value: string) => void;
  register: UseFormRegister<TFieldValues>;
};

type CommonSelectProps<TFieldValues extends FieldValues> = {
  data: {
    title: string;
    value: string;
  }[];
  errors?: Partial<Record<Path<TFieldValues>, FieldError>>;
  name: Path<TFieldValues>;
  className?: string;
  label?: string;
};

type ISelectProps<TFieldValues extends FieldValues> =
  CommonSelectProps<TFieldValues> &
    (
      | ControlledSelectProps<TFieldValues>
      | UncontrolledSelectProps<TFieldValues>
    );

const Select = <TFieldValues extends FieldValues>({
  data,
  errors,
  name,
  label,
  register,
  useControlled,
  value,
  setValue,
  className,
}: ISelectProps<TFieldValues>) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
      )}

      <select
        id={name}
        {...(useControlled
          ? { value, onChange: (e) => setValue?.(e.target.value) }
          : register(name))}
        className={`${className} border border-grey-light w-full p-3 rounded mb-2 ${
          errors && errors[name] ? 'border-red-500' : ''
        }`}
      >
        {data.map((item) => (
          <option key={item.value} value={item.value}>
            {item.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;

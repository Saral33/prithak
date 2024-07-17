import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';

interface CustomInputProps<TFieldValues extends FieldValues> {
  label: string;
  name: Path<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  className?: string;
  errors?: Partial<Record<Path<TFieldValues>, FieldError>>;
  type?: string;
  placeholder?: string;
}

const CustomInput = <TFieldValues extends FieldValues>({
  label,
  name,
  register,
  className,
  errors,
  type = 'text',
  placeholder,
}: CustomInputProps<TFieldValues>) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={name}
      >
        {label}
      </label>
      {type === 'date' ? (
        <input
          id={name}
          type={type}
          {...register(name, { valueAsDate: true })}
          placeholder={placeholder}
          className={` ${className} border border-grey-light w-full p-3 rounded mb-1 ${
            errors && errors[name] ? 'border-red-500' : ''
          }`}
        />
      ) : (
        <input
          id={name}
          type={type}
          {...register(name)}
          placeholder={placeholder}
          className={` ${className} border border-grey-light w-full p-3 rounded mb-1 ${
            errors && errors[name] ? 'border-red-500' : ''
          }`}
        />
      )}

      {errors && errors[name] && (
        <small className="text-red-500 text-xs italic">
          {errors[name]?.message}
        </small>
      )}
    </div>
  );
};

export default CustomInput;

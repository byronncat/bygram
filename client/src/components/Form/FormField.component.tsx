import { FormFieldProps } from '@types';

function FormField({
  type,
  placeholder,
  name,
  register,
  errors,
  validation,
  className,
}: FormFieldProps) {
  return (
    <div className={className?.field}>
      <input
        key={name}
        type={type}
        className={className?.input}
        id={name}
        placeholder={placeholder}
        {...register!(name, { ...validation })}
      />
      <label className={className?.label} htmlFor={name}>
        {placeholder}
      </label>
      <p className={className?.errorMessage}>{errors?.message}</p>
    </div>
  );
}

export default FormField;

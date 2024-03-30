import { FormFieldProps } from '../types/form';
import clsx from 'clsx';

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
    <div className={className?.formField}>
      <input
        key={name}
        type={type}
        className={className?.formInput}
        id={name}
        placeholder={placeholder}
        {...register!(name, { ...validation })}
      />
      <label className={className?.formLabel} htmlFor={name}>
        {placeholder}
      </label>
      <p
        className={clsx(
          className?.formErrorMessage,
          errors?.message && className?.formErrorMessageAnimation
        )}
      >
        {errors?.message}
      </p>
    </div>
  );
}

export default FormField;

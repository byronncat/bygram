import { FormFieldProps } from '../types';
import { useState } from 'react';
import clsx from 'clsx';

export default function FormField({
  type,
  placeholder,
  name,
  register,
  errors,
  validation,
  className,
}: FormFieldProps) {
  const [inputType, setInputType] = useState(type);
  function togglePasswordVisibilityHandler() {
    if (inputType === 'password') {
      setInputType('text');
    } else {
      setInputType('password');
    }
  }

  return (
    <>
      <div className={className?.formField}>
        <input
          key={name}
          type={inputType}
          className={clsx(
            className?.formInput,
            errors?.message && 'border-neon-red focus:border-neon-red',
          )}
          id={name}
          placeholder={' '}
          {...register!(name, { ...validation })}
        />
        <label
          className={clsx(
            className?.formLabel,
            errors?.message && 'text-neon-red peer-focus:text-neon-red',
          )}
          htmlFor={name}
        >
          {placeholder}
        </label>
        {type === 'password' && (
          <span
            className={clsx(
              'flex justify-center items-center',
              'absolute top-0 right-0',
              'h-full w-12',
              'text-xl',
              'cursor-pointer transition duration-300 opacity-50 hover:opacity-100',
            )}
            onClick={togglePasswordVisibilityHandler}
          >
            <i
              className={`icon-eye${inputType !== 'password' ? '-off' : ''}`}
            />
          </span>
        )}
      </div>
      <p
        className={clsx(
          className?.formErrorMessage,
          errors?.message && className?.formErrorMessageAnimation,
        )}
      >
        {errors?.message}
      </p>
    </>
  );
}

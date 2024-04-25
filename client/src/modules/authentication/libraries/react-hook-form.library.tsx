import { FormFieldProps } from '../types'
import { useState } from 'react'
import clsx from 'clsx'
import styles from '../styles/layouts/auth.module.sass'

export default function FormField({
  type,
  placeholder,
  name,
  register,
  errors,
  validation,
  className,
}: FormFieldProps) {
  const [inputType, setInputType] = useState(type)
  function togglePasswordVisibilityHandler() {
    if (inputType === 'password') {
      setInputType('text')
    } else {
      setInputType('password')
    }
  }

  return (
    <div className={className?.formField}>
      <input
        key={name}
        type={inputType}
        className={className?.formInput}
        id={name}
        placeholder={placeholder}
        {...register!(name, { ...validation })}
      />
      <label className={className?.formLabel} htmlFor={name}>
        {placeholder}
      </label>
      {type === 'password' && (
        <span
          className={styles['icon-eye']}
          onClick={togglePasswordVisibilityHandler}
        >
          <i className={`icon-eye${inputType !== 'password' ? '-off' : ''}`} />
        </span>
      )}
      <p
        className={clsx(
          className?.formErrorMessage,
          errors?.message && className?.formErrorMessageAnimation
        )}
      >
        {errors?.message}
      </p>
    </div>
  )
}

import { useForm, SubmitHandler } from 'react-hook-form'
import clsx from 'clsx'

import { ReactProps } from '@global'
import FormField from '../libraries/react-hook-form.library'
import { AuthenticationInformation, FormFieldProps } from '../types'

import styles from '../styles/layouts/auth.module.sass'

interface FormProps extends ReactProps {
  fieldList: FormFieldProps[]
  defaultValues: AuthenticationInformation
  submitHandler: SubmitHandler<AuthenticationInformation>
  fieldClass?: any
  submitPlaceholder?: string
}

export default function Form({
  className,
  fieldList,
  defaultValues,
  submitHandler,
  children,
  fieldClass,
  submitPlaceholder,
}: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthenticationInformation>({
    defaultValues,
  })

  return (
    <>
      <form onSubmit={handleSubmit(submitHandler)} className={className}>
        {fieldList.map((field) => {
          return (
            <FormField
              key={field.name}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              className={fieldClass}
              register={register}
              validation={field.validation}
              errors={errors[field.name]}
            />
          )
        })}
        <input
          type="submit"
          value={submitPlaceholder}
          className={clsx(styles['submit-btn'], 'w-100 pt-2 my-2', 'btn')}
        />
        {children}
      </form>
    </>
  )
}

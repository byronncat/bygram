import { useForm, SubmitHandler } from 'react-hook-form'
import { AuthenticationInformation, FormFieldProps } from '../types'
import FormField from './form-field.component'
import { ReactProps } from '@global'

interface FormProps extends ReactProps {
  fieldList: FormFieldProps[]
  defaultValues: AuthenticationInformation
  submitHandler: SubmitHandler<AuthenticationInformation>
  fieldClass?: any
  submitPlaceholder?: string
  submitClass?: any
}

export default function Form({
  className,
  fieldList,
  defaultValues,
  submitHandler,
  children,
  fieldClass,
  submitPlaceholder,
  submitClass,
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
          className={submitClass}
        />
        {children}
      </form>
    </>
  )
}

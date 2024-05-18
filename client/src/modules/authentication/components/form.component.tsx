import { useForm, SubmitHandler } from 'react-hook-form';
import { FormField } from '../libraries';
import type { ReactProps } from '@global';
import type { AuthenticationInformation, FormFieldProps } from '../types';

interface FormProps extends ReactProps {
  fieldList: FormFieldProps[];
  defaultValues: AuthenticationInformation;
  submitHandler: SubmitHandler<AuthenticationInformation>;
  fieldClass?: any;
  submitPlaceholder?: string;
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
  });
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
          );
        })}
        <input
          type="submit"
          value={submitPlaceholder}
          className="button w-full mt-5"
        />
        {children}
      </form>
    </>
  );
}

import { ReactNode } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AuthenticationInformation, FormFieldProps } from '@types';
import FormField from './formField.component';

interface FormData {
  fieldList: FormFieldProps[];
  defaultValues: AuthenticationInformation;
  submitHandler: SubmitHandler<AuthenticationInformation>;
  children?: ReactNode;
  fieldClass?: any;
  submitPlaceholder?: string;
  submitClass?: any;
}

function Form({
  fieldList,
  defaultValues,
  submitHandler,
  children,
  fieldClass,
  submitPlaceholder,
  submitClass,
}: FormData) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthenticationInformation>({
    defaultValues,
  });

  return (
    <>
      <form onSubmit={handleSubmit(submitHandler)}>
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
        <input type="submit" value={submitPlaceholder} className={submitClass} />
        {children}
      </form>
    </>
  );
}

export default Form;

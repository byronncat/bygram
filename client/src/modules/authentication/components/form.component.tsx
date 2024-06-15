import { useForm, SubmitHandler } from 'react-hook-form';
import { FormField } from '../libraries';
import { useGlobalContext } from '@global';

import type { ReactProps } from '@global';
import type { AuthenticationInformation, FormFieldProps } from '../types';

interface FormProps extends ReactProps {
  fieldList: FormFieldProps[];
  defaultValues: AuthenticationInformation;
  submitHandler: SubmitHandler<AuthenticationInformation>;
  fieldClass?: any;
  submitPlaceholder?: string;
}

const Form = ({
  className,
  fieldList,
  defaultValues,
  submitHandler,
  children,
  fieldClass,
  submitPlaceholder,
}: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthenticationInformation>({
    defaultValues,
  });
  const { loading } = useGlobalContext();

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
              error={errors[field.name]}
            />
          );
        })}
        <input
          type="submit"
          value={submitPlaceholder}
          className="simple-border-button w-full mt-5 py-2"
          disabled={loading.isLoading}
        />
        {children}
      </form>
    </>
  );
};

export default Form;

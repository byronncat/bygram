import { FieldError, useForm } from "react-hook-form";
import { AuthenticationInformation, FormFieldProps } from "@types";
import { SubmitHandler } from "react-hook-form";
import FormField from "./FormField.component";

interface FormData {
  fieldList: FormFieldProps[];
  defaultValues: AuthenticationInformation;
  submitHandler: SubmitHandler<AuthenticationInformation>;
  children: any;
}

function Form({ fieldList, defaultValues, submitHandler, children }: FormData) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthenticationInformation>({
    defaultValues,
  });

  return (
    <>
      <form
        action="#"
        className="form w-100 d-flex flex-column justify-content-center align-items-center"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="form-panel rounded-3">
          {fieldList.map((field) => {
            return (
              <FormField
                key={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                register={register}
                validation={field.validation}
                errors={errors[field.name] as FieldError}
              />
            );
          })}

          {children}
        </div>
      </form>
    </>
  );
}

export default Form;

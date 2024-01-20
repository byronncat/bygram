import { useForm } from "react-hook-form";
import { FormData, FormFieldProps } from "@/types";
import FormField from "./FormField.component";
import axios from "axios";

function Form({
  fieldList,
  defaultValues,
}: {
  fieldList: Array<{
    name: FormFieldProps["name"];
    type: FormFieldProps["type"];
    placeholder: FormFieldProps["placeholder"];
  }>;
  defaultValues: FormData;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    axios
      .post("/api/auth/login", data)
      .then(() => {
        console.log("Success");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <form
        action="#"
        className="d-flex flex-column justify-content-center align-items-center form-group"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="mb-5">Sign in</h2>

        {fieldList.map((field) => (
          <FormField
            key={field.name}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            register={register}
            errors={errors[field.name]}
          />
        ))}

        <input type="submit" value="Login" className="my-4 btn btn-primary" />

        <p className="">Or Sign in with social platforms</p>
        <div className="w-100 d-flex justify-content-evenly">
          <a className="fs-2">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a className="fs-2">
            <i className="fa-brands fa-google"></i>
          </a>
          <a className="fs-2">
            <i className="fa-brands fa-square-instagram"></i>
          </a>
        </div>
      </form>
    </>
  );
}

export default Form;

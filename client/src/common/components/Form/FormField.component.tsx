import { FormFieldProps } from "@/types";

interface FormField {
  type: FormFieldProps["type"];
  placeholder: FormFieldProps["placeholder"];
  name: FormFieldProps["name"];
  register: FormFieldProps["register"];
  errors: FormFieldProps["errors"];
}

export default function FormField ({ type, placeholder, name, register, errors }: FormField) {
  return (
    <div className="d-flex flex-column">
      <label htmlFor={name}>{placeholder}</label>
      <input
        type={type}
        className="form-control"
        id={name}
        placeholder={placeholder}
        {...register(name, { required: "This is required" })}
      />
      <p>{errors?.message}</p>
    </div>
  );
};
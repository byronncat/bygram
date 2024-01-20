import { FormFieldProps } from "@/types";

export default function FormField ({ type, placeholder, name, register, errors, validation }: FormFieldProps) {
  return (
    <div className="form-field form-floating d-flex flex-column p-0">
      <input
        key={name}
        type={type}
        className="form-control"
        id={name}
        placeholder={placeholder}
        {...register!(name, { ...validation })}
      />
      <label htmlFor={name}>{placeholder}</label>
      <p className="error-message mt-1">{errors?.message}</p>
    </div>
  );
};
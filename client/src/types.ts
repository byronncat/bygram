import exp from "constants";
import { FieldError, UseFormRegister } from "react-hook-form";

export type FormData = {
  username: string;
  password: string;
  email?: string;
};

export type FormFieldProps = {
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<FormData>;
  errors: FieldError | undefined;
  isRequired?: boolean;
};

// Union type
export type ValidFieldNames = "username" | "email" | "password";
import { Form } from "../../../common/components/index";
import { Link } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import { AuthenticationInformation } from "@/types";

function ResetPasswordPage() {
  const defaultValues: AuthenticationInformation = {
    email: "",
  };

  const submitHandler: SubmitHandler<AuthenticationInformation> = (data) => console.log(data);

  return (
    <>
      <h2 className="mb-3 fs-1 fw-bolder text-light text-capitalize">forgot password</h2>
      <Form
        fieldList={[
          {
            name: "password",
            type: "password",
            placeholder: "Password",
            validation: {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            },
          },
          {
            name: "confirmPassword",
            type: "password",
            placeholder: "Confirm Password",
            validation: {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            },
          },
        ]}
        defaultValues={defaultValues}
        submitHandler={submitHandler}
      >
        <input type="submit" value="Confirm" className="submit-btn py-2 mt-2 btn w-100" />
      </Form>
    </>
  );
}

export default ResetPasswordPage;
import { Form } from "../../../common/components/index";
import { Link } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import { AuthenticationInformation } from "@/types";

function LoginPage() {
  const defaultValues: AuthenticationInformation = {
    username: "",
    password: "",
  };

  const submitHandler: SubmitHandler<AuthenticationInformation> = (data) => console.log(data);

  return (
    <>
      <h2 className="mb-3 fs-1 fw-bolder text-light text-capitalize">login</h2>
      <Form
        fieldList={[
          {
            name: "username",
            type: "text",
            placeholder: "Username",
            validation: {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
            },
          },
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
        ]}
        defaultValues={defaultValues}
        submitHandler={submitHandler}
      >
        <Link
          to="/auth/forgot-password"
          className="link mt-3 text-reset text-decoration-none d-block text-center fs-6"
        >
          Forgot password?
        </Link>
        <input type="submit" value="Login" className="submit-btn pt-2 my-2 btn w-100" />
        <p className="text-center mt-1 mb-0">--- or ---</p>
        <Link
          to="/auth/register"
          className="link text-reset text-decoration-none d-block text-center fs-6"
        >
          Sign up here
        </Link>

        <p className="text-center mt-5 mb-2">--- Or Login with ---</p>
        <div className="w-100 d-flex justify-content-center align-items-center">
          <a className="link text-reset fs-2">
            <i className="fa-brands fa-google"></i>
          </a>
        </div>
      </Form>
    </>
  );
}

export default LoginPage;

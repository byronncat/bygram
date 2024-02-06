import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import axios, { AxiosResponse } from "axios";
import { AuthenticationInformation } from "@/types";
import { useAuth, Form } from "../../components/index";
import { setLocalState } from "../../utils/index";

function LoginPage() {
  const defaultValues: AuthenticationInformation = {
    username: "test",
    password: "123456",
  };

  const navigate = useNavigate();
  const { setAuthentication } = useAuth();
  const submitHandler: SubmitHandler<AuthenticationInformation> = async (data) => {
    axios
      .post("/api/auth/login", data, { withCredentials: true })
      .then((res: AxiosResponse) => {
        setLocalState({
          token: res.data.token,
          user: res.data.user,
          isAuthenticated: true,
        });
        setAuthentication({
          isAuthenticated: true,
          token: res.data.token,
          user: res.data.user,
        });
        navigate("/");
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response);
        }
      });
  };

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
      </Form>
    </>
  );
}

export default LoginPage;

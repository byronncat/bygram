import { Form } from "../../../common/components/index";

function LoginPage() {
  const defaultValues = {
    username: "",
    password: "",
  };
  
  return (
    <>
      <Form
        fieldList={[
          {
            name: "username",
            type: "text",
            placeholder: "Username",
          },
          {
            name: "password",
            type: "password",
            placeholder: "Password",
          },
        ]}
        defaultValues={defaultValues}
      />
    </>
  );
}

export default LoginPage;
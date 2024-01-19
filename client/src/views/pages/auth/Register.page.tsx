import { Form } from "../../../common/components/index";

function RegisterPage() {
  const defaultValues = {
    username: "",
    password: "",
    email: "example@gmail.com",
  };
  
  return (
    <>
      <Form
        fieldList={[
          {
            name: "email",
            type: "email",
            placeholder: "Email",
          },
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

export default RegisterPage;

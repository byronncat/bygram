import { SubmitHandler } from 'react-hook-form';

import { useClassNameContext } from '../providers';
import Form from '../components/form.component';
import type { AuthenticationInformation, FormFieldProps } from '../types';

const defaultValues: AuthenticationInformation = {
  email: '',
};

const fieldList: FormFieldProps[] = [
  {
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    validation: {
      required: 'Password is required',
      minLength: {
        value: 6,
        message: 'Password must be at least 6 characters',
      },
    },
  },
];

export default function ResetPassword() {
  const { className } = useClassNameContext();
  const submitHandler: SubmitHandler<AuthenticationInformation> = (data) =>
    console.log(data);

  return (
    <>
      <Form
        fieldList={fieldList}
        defaultValues={defaultValues}
        submitHandler={submitHandler}
        fieldClass={className.formField}
        submitPlaceholder="Confirm"
      />
    </>
  );
}

import { Link, useOutletContext } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import axios, { AxiosResponse } from 'axios';
import clsx from 'clsx';
import { AuthenticationInformation, FormFieldProps } from '@types';
import { Form, useGlobal } from '@components';
import { API } from '@types';
import styles from '@sass/authLayout.module.sass';
import { useAuthLayoutContext } from '@layouts';
import { useEffect } from 'react';

const defaultValues: AuthenticationInformation = {
  email: '',
};

const fieldList: FormFieldProps[] = [
  {
    name: 'email',
    type: 'email',
    placeholder: 'Email',
    validation: {
      required: 'Email is required',
      pattern: {
        value: /\S+@\S+\.\S+/,
        message: 'Entered value does not match email format',
      },
    },
  },
];

function ForgotPasswordPage() {
  const { displayToast } = useGlobal();
  const { className } = useAuthLayoutContext();
  const { setTitle }: { setTitle: React.Dispatch<React.SetStateAction<string>> } =
    useOutletContext();
  useEffect(() => {
    setTitle('reset password');
  }, [setTitle]);

  const submitHandler: SubmitHandler<AuthenticationInformation> = async (data) => {
    axios
      .post('/api/auth/send-email', data)
      .then((res: AxiosResponse) => {
        const response: API = res.data;
        displayToast(response.message, 'success');
      })
      .catch((err) => {
        const error = err.response.data;
        displayToast(error.message, 'error');
      });
  };

  return (
    <>
      <Form
        fieldList={fieldList}
        defaultValues={defaultValues}
        submitHandler={submitHandler}
        fieldClass={className.formField}
        submitPlaceholder="Send Email"
        submitClass={clsx(styles['submit-btn'], 'btn', 'w-100 pt-2 my-2')}
      >
        <p className={clsx('text-center', 'my-1')}>--- or ---</p>
        <Link
          to="/login"
          className={clsx('link d-block', ' fs-6 text-reset text-decoration-none text-center')}
        >
          Turn back
        </Link>
      </Form>
    </>
  );
}

export default ForgotPasswordPage;

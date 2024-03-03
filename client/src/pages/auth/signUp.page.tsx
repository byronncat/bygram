import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import axios, { AxiosResponse } from 'axios';
import clsx from 'clsx';
import { AuthenticationInformation, Credentials, FormFieldProps } from '@types';
import { useAuth, Form, ToastMessage } from '@components';
import { API } from '@types';
import styles from '@sass/authLayout.module.sass';
import { useAuthLayoutContext } from '@layouts';
import { useState } from 'react';

const defaultValues: AuthenticationInformation = {
  username: 'test',
  password: '123456',
  email: 'test@gmail.com',
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
  {
    name: 'username',
    type: 'text',
    placeholder: 'Username',
    validation: {
      required: 'Username is required',
      minLength: {
        value: 3,
        message: 'Username must be at least 3 characters',
      },
    },
  },
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

function RegisterPage() {
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { setAuthenticationStorage } = useAuth();
  const { className } = useAuthLayoutContext();

  const { setTitle }: { setTitle: React.Dispatch<React.SetStateAction<string>> } =
    useOutletContext();
  setTitle('sign up');

  const submitHandler: SubmitHandler<AuthenticationInformation> = (data) => {
    axios
      .post('/api/auth/register', data)
      .then((res: AxiosResponse) => {
        const response: API = res.data;
        setAuthenticationStorage({ user: response.data as Credentials, isAuthenticated: true });
        navigate('/');
      })
      .catch((err) => {
        if (err.response) {
          setMessage(err.response.data.message);
          setShow(true);
        }
      });
  };

  return (
    <>
      {message && (
        <ToastMessage
          header="Message"
          message={message}
          className="m-4"
          show={show}
          setShow={setShow}
        />
      )}
      <Form
        fieldList={fieldList}
        defaultValues={defaultValues}
        submitHandler={submitHandler}
        fieldClass={className.formField}
        submitPlaceholder="Register"
        submitClass={clsx(styles['submit-btn'], 'btn', 'w-100 pt-2 my-2')}
      >
        <p className={clsx('text-center', 'my-1')}>--- or ---</p>
        <Link
          to="/login"
          className={clsx('link d-block', ' fs-6 text-reset text-decoration-none text-center')}
        >
          Login here
        </Link>
      </Form>
    </>
  );
}

export default RegisterPage;

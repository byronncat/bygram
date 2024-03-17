import { useLayoutEffect } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import clsx from 'clsx';
import { useAuth, Form, useGlobal } from '@components';
import { useAuthLayoutContext } from '@layouts';
import { AuthenticationInformation, FormFieldProps } from '@types';
import styles from '@sass/layout/auth.module.sass';
import { registerAPI } from '@services';

const defaultValues: AuthenticationInformation = {
  email: 'test@gmail.com',
  username: 'test',
  password: '123456',
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
  const { displayToast } = useGlobal();
  const navigate = useNavigate();
  const { setAuthenticationStorage } = useAuth();
  const { className } = useAuthLayoutContext();

  const { setTitle }: { setTitle: React.Dispatch<React.SetStateAction<string>> } =
    useOutletContext();
  useLayoutEffect(() => {
    setTitle('sign up');
  }, [setTitle]);

  const submitHandler: SubmitHandler<AuthenticationInformation> = async (data) => {
    const response = await registerAPI(data);
    if (response.success) {
      setAuthenticationStorage({ user: response.data, isAuthenticated: true });
      navigate('/');
      displayToast(response.message, 'success');
    } else {
      displayToast(response.message, 'error');
    }
  };

  return (
    <>
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

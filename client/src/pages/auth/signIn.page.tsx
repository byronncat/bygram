import { useLayoutEffect } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import clsx from 'clsx';
import { Form, useAuth, useGlobal } from '@components';
import { useAuthLayoutContext } from '@layouts';
import { AuthenticationInformation, FormFieldProps } from '@types';
import styles from '@sass/layout/auth.module.sass';
import { loginAPI } from '@services';

const defaultValues: AuthenticationInformation = {
  email: 'test@gmail.com',
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
        message: 'Wrong email format',
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

function LoginPage() {
  const navigate = useNavigate();
  const { setAuthenticationStorage } = useAuth();
  const { displayToast } = useGlobal();
  const { className } = useAuthLayoutContext();

  const { setTitle }: { setTitle: React.Dispatch<React.SetStateAction<string>> } =
    useOutletContext();
  useLayoutEffect(() => {
    setTitle('sign in');
  }, [setTitle]);

  const submitHandler: SubmitHandler<AuthenticationInformation> = async (data) => {
    const response = await loginAPI(data);
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
        submitPlaceholder="Login"
        submitClass={clsx(styles['submit-btn'], 'btn', 'w-100 pt-2 my-2')}
      >
        <p className={clsx('text-center', 'my-1')}>--- or ---</p>
        <span className={clsx('d-flex justify-content-between', 'mt-4')}>
          <Link
            to="/register"
            className={clsx('link d-block', 'text-reset text-decoration-none text-center fs-6')}
          >
            Sign up
          </Link>
          <Link
            to="/forgot-password"
            className={clsx('d-block link', 'text-reset text-decoration-none text-center fs-6')}
          >
            Forgot password?
          </Link>
        </span>
      </Form>
    </>
  );
}

export default LoginPage;

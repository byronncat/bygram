import { useLayoutEffect } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import clsx from 'clsx';
import { Form } from '@components';
import { useGlobalContext, useStorageContext } from '@contexts';
import { useAuthLayoutContext } from '@layouts';
import { registerAPI } from '@services';
import { registerField } from '../../constants';
import { AuthenticationInformation } from '@types';
import styles from '@styles/layout/auth.module.sass';

const defaultValues: AuthenticationInformation = {
  email: 'test@gmail.com',
  username: 'test',
  password: '123456',
};

function RegisterPage() {
  const navigate = useNavigate();
  const { className } = useAuthLayoutContext();
  const { displayToast } = useGlobalContext();
  const { setAuthenticationStorage } = useStorageContext();

  const { setTitle }: { setTitle: React.Dispatch<React.SetStateAction<string>> } =
    useOutletContext();
  useLayoutEffect(() => {
    setTitle('sign up');
  }, [setTitle]);

  const submitHandler: SubmitHandler<AuthenticationInformation> = async (data) => {
    displayToast("Waiting for server's response", 'loading');
    const response = await registerAPI(data);
    if (response.success && response.data) {
      setAuthenticationStorage({ user: response.data, isAuthenticated: true });
      navigate('/');
    }
    displayToast(response.message, response.success ? 'success' : 'error');
  };

  return (
    <>
      <Form
        fieldList={registerField}
        defaultValues={defaultValues}
        submitHandler={submitHandler}
        fieldClass={className}
        submitPlaceholder="Register"
        submitClass={clsx(styles['submit-btn'], 'btn', 'w-100 pt-2 my-2')}
      >
        <p className={clsx('text-center', 'my-1')}>--- or ---</p>
        <Link to="/login" className={clsx('link d-block', ' text-center fs-6')}>
          Login here
        </Link>
      </Form>
    </>
  );
}

export default RegisterPage;

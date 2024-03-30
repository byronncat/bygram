import { useLayoutEffect } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import clsx from 'clsx';
import { useGlobalContext, useStorageContext } from '@global';
import { useAuthLayoutContext } from '../contexts/auth.context';
import Form from '../components/form.component';
import { registerAPI } from '../services/auth.service';
import { REGISTER_FIELD } from '../constants';
import { AuthenticationInformation } from '../types';
import styles from '../styles/auth.module.sass';

const defaultValues: AuthenticationInformation = {
  email: '',
  username: '',
  password: '',
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
        fieldList={REGISTER_FIELD}
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

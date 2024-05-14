import { useLayoutEffect } from 'react';
import { useNavigate, useOutletContext, Link } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import clsx from 'clsx';

import { toast } from '@global';
import { useAuthenticationContext } from '../providers';
import { DEFAULT_VALUES, FIELD } from '../constants';
import { useClassNameContext } from '../providers';

import { Form } from '../components';
import { loginAPI } from '../services/auth.service';
import { AuthenticationInformation, OutletContextProps } from '../types';

function LoginPage() {
  const navigate = useNavigate();
  const { className } = useClassNameContext();
  const { session } = useAuthenticationContext();

  const { setTitle }: OutletContextProps = useOutletContext();
  useLayoutEffect(() => {
    setTitle('sign in');
  }, [setTitle]);

  const submitHandler: SubmitHandler<AuthenticationInformation> = async (
    data,
  ) => {
    toast.display("Waiting for server's response", 'loading');
    const response = await loginAPI(data);
    if (response.success && response.data) {
      session.set(response.data.sessionId);
      navigate('/');
    }
    toast.display(response.message, response.success ? 'success' : 'error');
  };

  return (
    <>
      <Form
        className={className.form}
        fieldList={FIELD.LOGIN}
        defaultValues={DEFAULT_VALUES.LOGIN}
        submitHandler={submitHandler}
        fieldClass={className}
        submitPlaceholder="Login"
      >
        <p className={clsx('text-center', 'my-2')}>--- or ---</p>
        <Link
          to="/register"
          className={clsx(
            'block font-medium text-center capitalize',
            'duration-300 hover:text-slate-300',
          )}
        >
          sign up
        </Link>
      </Form>
    </>
  );
}

export default LoginPage;

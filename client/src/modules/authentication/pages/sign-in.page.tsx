import { useLayoutEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';

import { toast } from '@global';
import { Divider, Form, NavigationButton } from '../components';
import { useAuthenticationContext, useClassNameContext } from '../providers';
import { loginAPI } from '../api';
import { DEFAULT_VALUES, FIELD } from '../constants';

import type { AuthenticationInformation } from '../types';
import type { OutletContextProps } from '../hocs';

function LoginPage() {
  const navigate = useNavigate();
  const { className } = useClassNameContext();
  const { setAuthenticatedState } = useAuthenticationContext();

  const { setTitle }: OutletContextProps = useOutletContext();
  useLayoutEffect(() => {
    setTitle('login');
  }, [setTitle]);

  const submitHandler: SubmitHandler<AuthenticationInformation> = async (
    data,
  ) => {
    toast.display("Waiting for server's response", 'loading');
    const response = await loginAPI(data);
    if (response.success) {
      setAuthenticatedState(true);
      navigate('/');
    }
    toast.display(response.message, response.success ? 'success' : 'error');
  };

  return (
    <>
      <Form
        className={className.form}
        fieldList={FIELD.LOGIN}
        defaultValues={DEFAULT_VALUES.LOGIN_FORM}
        submitHandler={submitHandler}
        fieldClass={className}
        submitPlaceholder="Login"
      >
        <Divider />
        <NavigationButton text="register" path="/register" />
      </Form>
    </>
  );
}

export default LoginPage;

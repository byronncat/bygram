import { useLayoutEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';

import { toast, useGlobalContext } from '@global';
import { Divider, Form, NavigationText } from '../components';
import { useAuthenticationContext, useClassNameContext } from '../providers';
import { loginAPI } from '../api';
import { DEFAULT_VALUES, FIELD } from '../constants';

import type { OutletContextProps } from '../hocs';
import type { AuthenticationInformation } from '../types';

export default function Login() {
  const navigate = useNavigate();
  const { loading } = useGlobalContext();
  const { className } = useClassNameContext();
  const { setAuthenticatedState } = useAuthenticationContext();

  const { setTitle }: OutletContextProps = useOutletContext();
  useLayoutEffect(() => {
    setTitle('login');
  }, [setTitle]);

  const submitHandler: SubmitHandler<AuthenticationInformation> = async (
    data,
  ) => {
    loading.start();
    // toast.display("Waiting for server's response", 'loading');
    const response = await loginAPI(data);
    loading.end();
    if (response.success) {
      setAuthenticatedState(true);
      navigate('/');
    }
    // toast.display(response.message, response.success ? 'success' : 'error');
  };

  return (
    <Form
      className={className.form}
      fieldList={FIELD.LOGIN}
      defaultValues={DEFAULT_VALUES.LOGIN_FORM}
      submitHandler={submitHandler}
      fieldClass={className}
      submitPlaceholder="Login"
    >
      <Divider />
      <NavigationText
        text="Don't have an account?"
        navigateText="register"
        path="/register"
      />
    </Form>
  );
}

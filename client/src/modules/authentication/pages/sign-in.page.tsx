import { useLayoutEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';

import { toast, useGlobalContext } from '@global';
import { Divider, Form, NavigationText } from '../components';
import { useAuthenticationContext, useClassNameContext } from '../providers';
import { authenticationApi } from '../api';
import { DEFAULT_VALUES, FIELD } from '../constants';

import type { OutletContextProps } from '../hocs';
import type { AuthenticationInformation } from '../types';

const Login = () => {
  const navigate = useNavigate();
  const { loading } = useGlobalContext();
  const { className } = useClassNameContext();
  const { login } = useAuthenticationContext();

  const { setTitle }: OutletContextProps = useOutletContext();
  useLayoutEffect(() => {
    setTitle('login');
  }, [setTitle]);

  const submitHandler: SubmitHandler<AuthenticationInformation> = async (
    data,
  ) => {
    loading.start();
    toast.loading('Waiting for login');
    const response = await authenticationApi.login(data);
    loading.end();
    if (response.success) {
      toast.success(response.message);
      login();
      navigate('/');
    } else {
      toast.error(response.message);
    }
  };

  return (
    <Form
      className={className.form}
      fieldList={FIELD.LOGIN}
      defaultValues={DEFAULT_VALUES.LOGIN_FORM}
      submitHandler={submitHandler}
      fieldClass={className}
      submitPlaceholder="Submit"
    >
      <Divider />
      <NavigationText
        text="Don't have an account?"
        navigateText="register"
        path="/register"
      />
    </Form>
  );
};

export default Login;

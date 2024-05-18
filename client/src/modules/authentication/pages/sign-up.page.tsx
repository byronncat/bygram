import { useLayoutEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';

import { toast } from '@global';
import { Divider, Form, NavigationButton } from '../components';
import { useAuthenticationContext, useClassNameContext } from '../providers';
import { registerAPI } from '../api';
import { DEFAULT_VALUES, FIELD } from '../constants';

import type { AuthenticationInformation } from '../types';
import type { OutletContextProps } from '../hocs';

function RegisterPage() {
  const navigate = useNavigate();
  const { className } = useClassNameContext();
  const { setAuthenticatedState } = useAuthenticationContext();

  const { setTitle }: OutletContextProps = useOutletContext();
  useLayoutEffect(() => {
    setTitle('register');
  }, [setTitle]);

  const submitHandler: SubmitHandler<AuthenticationInformation> = async (
    data,
  ) => {
    toast.display("Waiting for server's response", 'loading');
    const response = await registerAPI(data);
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
        fieldList={FIELD.REGISTER}
        defaultValues={DEFAULT_VALUES.REGISTER_FORM}
        submitHandler={submitHandler}
        fieldClass={className}
        submitPlaceholder="Register"
      >
        <Divider />
        <NavigationButton text="login" path="/login" />
      </Form>
    </>
  );
}

export default RegisterPage;

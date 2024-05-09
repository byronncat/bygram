import { useLayoutEffect } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import clsx from 'clsx';

import { toast } from '@global';
import { useClassNameContext } from '../providers/className.context';
import Form from '../components/form.component';
import { registerAPI } from '../services/auth.service';
import { FIELD } from '../constants';
import { AuthenticationInformation } from '../types';

const defaultValues: AuthenticationInformation = {
  email: '',
  username: '',
  password: '',
};

function RegisterPage() {
  const navigate = useNavigate();
  const { className } = useClassNameContext();

  const {
    setTitle,
  }: { setTitle: React.Dispatch<React.SetStateAction<string>> } =
    useOutletContext();
  useLayoutEffect(() => {
    setTitle('sign up');
  }, [setTitle]);

  const submitHandler: SubmitHandler<AuthenticationInformation> = async (
    data,
  ) => {
    toast.display("Waiting for server's response", 'loading');
    const response = await registerAPI(data);
    if (response.success && response.data) {
      navigate('/');
    }
    toast.display(response.message, response.success ? 'success' : 'error');
  };

  return (
    <>
      <Form
        fieldList={FIELD.REGISTER}
        defaultValues={defaultValues}
        submitHandler={submitHandler}
        fieldClass={className}
        submitPlaceholder="Register"
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

import { useLayoutEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import clsx from 'clsx';
import { useGlobalContext, API } from '@global';
import Form from '../components/form.component';
import { useAuthLayoutContext } from '../contexts/auth.context';
import { sendResetEmailAPI } from '../services/auth.service';
import { SEND_EMAIL_FIELD } from '../constants';
import { AuthenticationInformation } from '../types';
import styles from '../styles/layouts/auth.module.sass';

const defaultValues: AuthenticationInformation = {
  email: '',
};

function ForgotPasswordPage() {
  const { className } = useAuthLayoutContext();
  const { displayToast } = useGlobalContext();
  const { setTitle }: { setTitle: React.Dispatch<React.SetStateAction<string>> } =
    useOutletContext();
  useLayoutEffect(() => {
    setTitle('forgot');
  }, [setTitle]);

  const submitHandler: SubmitHandler<AuthenticationInformation> = async (data) => {
    const response: API = await sendResetEmailAPI(data);
    displayToast(response.message, response.success ? 'success' : 'error');
  };

  return (
    <>
      <Form
        fieldList={SEND_EMAIL_FIELD}
        defaultValues={defaultValues}
        submitHandler={submitHandler}
        fieldClass={className}
        submitPlaceholder="Send Email"
        submitClass={clsx(styles['submit-btn'], 'btn', 'w-100 pt-2 my-2')}
      >
        <p className={clsx('text-center', 'my-1')}>--- or ---</p>
        <Link to="/login" className={clsx('link d-block', ' text-center fs-6')}>
          Turn back
        </Link>
      </Form>
    </>
  );
}

export default ForgotPasswordPage;

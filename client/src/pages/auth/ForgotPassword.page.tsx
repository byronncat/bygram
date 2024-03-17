import { useLayoutEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import clsx from 'clsx';
import { Form, useGlobal } from '@components';
import { useAuthLayoutContext } from '@layouts';
import { API, AuthenticationInformation, FormFieldProps } from '@types';
import styles from '@sass/layout/auth.module.sass';
import { sendResetEmailAPI } from '@services';

const defaultValues: AuthenticationInformation = {
  email: '',
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
        message: 'Entered value does not match email format',
      },
    },
  },
];

function ForgotPasswordPage() {
  const { displayToast } = useGlobal();
  const { className } = useAuthLayoutContext();
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
        fieldList={fieldList}
        defaultValues={defaultValues}
        submitHandler={submitHandler}
        fieldClass={className.formField}
        submitPlaceholder="Send Email"
        submitClass={clsx(styles['submit-btn'], 'btn', 'w-100 pt-2 my-2')}
      >
        <p className={clsx('text-center', 'my-1')}>--- or ---</p>
        <Link
          to="/login"
          className={clsx('link d-block', ' fs-6 text-reset text-decoration-none text-center')}
        >
          Turn back
        </Link>
      </Form>
    </>
  );
}

export default ForgotPasswordPage;

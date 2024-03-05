import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import axios, { AxiosResponse } from 'axios';
import clsx from 'clsx';
import { AuthenticationInformation, Credentials, FormFieldProps } from '@types';
import { useAuth, Form, ToastMessage } from '@components';
import { API } from '@types';
import styles from '@sass/authLayout.module.sass';
import { useAuthLayoutContext } from '@layouts';
import { useEffect, useState } from 'react';

const defaultValues: AuthenticationInformation = {
  email: '',
};

const fieldList: FormFieldProps[] = [
  {
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    validation: {
      required: 'Password is required',
      minLength: {
        value: 6,
        message: 'Password must be at least 6 characters',
      },
    },
  },
  {
    name: 'confirmPassword',
    type: 'password',
    placeholder: 'Confirm Password',
    validation: {
      required: 'Password is required',
      minLength: {
        value: 6,
        message: 'Password must be at least 6 characters',
      },
    },
  },
];
function ResetPasswordPage() {
  const { className } = useAuthLayoutContext();
  const { setTitle }: { setTitle: React.Dispatch<React.SetStateAction<string>> } =
    useOutletContext();
  useEffect(() => {
    setTitle('reset password');
  }, []);

  const submitHandler: SubmitHandler<AuthenticationInformation> = (data) => console.log(data);

  return (
    <>
      <Form
        fieldList={fieldList}
        defaultValues={defaultValues}
        submitHandler={submitHandler}
        fieldClass={className.formField}
        submitPlaceholder="Confirm"
        submitClass={clsx(styles['submit-btn'], 'btn', 'w-100 pt-2 my-2')}
      />
    </>
  );
}

export default ResetPasswordPage;

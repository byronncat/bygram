import { useLayoutEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import clsx from 'clsx';

import { toast, useGlobalContext } from '@global';
import { Divider, Form, NavigationText } from '../components';
import { useAuthenticationContext, useClassNameContext } from '../providers';
import { authenticationApi } from '../api';
import { DEFAULT_VALUES, FIELD } from '../constants';

import type { OutletContextProps } from '../hocs';
import type { AuthenticationInformation } from '../types';

const Register = () => {
  const { loading } = useGlobalContext();
  const { className } = useClassNameContext();
  const { login } = useAuthenticationContext();

  const { setTitle }: OutletContextProps = useOutletContext();
  useLayoutEffect(() => {
    setTitle('register');
  }, [setTitle]);

  const submitHandler: SubmitHandler<AuthenticationInformation> = async (
    data,
  ) => {
    loading.start();
    toast.loading('Waiting for registration');
    const response = await authenticationApi.register(data);
    loading.end();
    if (response.success) {
      login();
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div
      className={clsx(className.form)}
      style={{
        width: '800px',
      }}
    >
      <div className="flex gap-x-10">
        <Form
          className="basis-1/2"
          fieldList={FIELD.REGISTER}
          defaultValues={DEFAULT_VALUES.REGISTER_FORM}
          submitHandler={submitHandler}
          fieldClass={className}
          submitPlaceholder="Register"
        />
        <div className="basis-1/2 flex flex-col">
          {Object.entries(FIELD.REQUIREMENTS).map(([field, requirements]) => (
            <div key={field} className={clsx('mb-4')}>
              <h3
                className={clsx(
                  'mb-2',
                  'font-semibold capitalize',
                  'text-on-surface/[0.87] dark:text-dark-on-surface/[0.87]',
                )}
              >
                {field}:
              </h3>
              <ul
                className={clsx(
                  'space-y-1 list-disc list-inside',
                  'text-on-surface/[0.87] dark:text-dark-on-surface/[0.8]',
                )}
              >
                {requirements.map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <Divider />
      <NavigationText
        navigateText="login"
        text="Already have an account?"
        path="/login"
      />
    </div>
  );
};

export default Register;

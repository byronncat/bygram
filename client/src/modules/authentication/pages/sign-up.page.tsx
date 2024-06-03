import { useLayoutEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import clsx from 'clsx';

import { toast, useGlobalContext } from '@global';
import { Divider, Form, NavigationText } from '../components';
import { useAuthenticationContext, useClassNameContext } from '../providers';
import { registerAPI } from '../api';
import { DEFAULT_VALUES, FIELD } from '../constants';

import type { OutletContextProps } from '../hocs';
import type { AuthenticationInformation } from '../types';

export default function Register() {
  const navigate = useNavigate();
  const { loading } = useGlobalContext();
  const { className } = useClassNameContext();
  const { setAuthenticatedState } = useAuthenticationContext();

  const { setTitle }: OutletContextProps = useOutletContext();
  useLayoutEffect(() => {
    setTitle('register');
  }, [setTitle]);

  const submitHandler: SubmitHandler<AuthenticationInformation> = async (
    data,
  ) => {
    loading.start();
    toast.display("Waiting for server's response", 'loading');
    const response = await registerAPI(data);
    loading.end();
    if (response.success) {
      setAuthenticatedState(true);
      navigate('/');
    }
    toast.display(response.message, response.success ? 'success' : 'error');
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
              <h3 className="capitalize mb-2">{field}:</h3>
              <ul className="space-y-1 text-gray-400 list-disc list-inside">
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
}

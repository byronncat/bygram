import { useLayoutEffect } from 'react'
import { useNavigate, useOutletContext, Link } from 'react-router-dom'
import { SubmitHandler } from 'react-hook-form'
import clsx from 'clsx'

import { toast, useStorageContext } from '@global'
import { DEFAULT_VALUES, FIELD } from '../constants'
import { useClassNameContext } from '../providers'

import { Form } from '../components'
import { loginAPI } from '../services/auth.service'
import { AuthenticationInformation, OutletContextProps } from '../types'
import styles from '../styles/layouts/auth.module.sass'

function LoginPage() {
  const navigate = useNavigate()
  const { className } = useClassNameContext()
  const { handleChangeAuthentication } = useStorageContext()

  const { setTitle }: OutletContextProps = useOutletContext()
  useLayoutEffect(() => {
    setTitle('sign in')
  }, [setTitle])

  const submitHandler: SubmitHandler<AuthenticationInformation> = async (
    data
  ) => {
    toast.display("Waiting for server's response", 'loading')
    const response = await loginAPI(data)
    if (response.success && response.data) {
      handleChangeAuthentication({
        identity: response.data,
        isAuthenticated: true,
      })
      navigate('/')
    }
    toast.display(response.message, response.success ? 'success' : 'error')
  }

  return (
    <>
      <Form
        className={className.form}
        fieldList={FIELD.LOGIN}
        defaultValues={DEFAULT_VALUES.LOGIN}
        submitHandler={submitHandler}
        fieldClass={className}
        submitPlaceholder="Login"
        submitClass={clsx(styles['submit-btn'], 'btn', 'w-100 pt-2 my-2')}
      >
        <p className={clsx('text-center', 'my-1')}>--- or ---</p>
        {/* <span className={clsx('d-flex justify-content-between', 'mt-4')}> */}
        <Link
          to="/register"
          className={clsx('link d-block', 'text-center fs-6')}
        >
          Sign up
        </Link>
        {/* <Link to="/forgot-password" className={clsx('d-block link', 'text-center fs-6')}>
            Forgot password?
          </Link>
        </span> */}
      </Form>
    </>
  )
}

export default LoginPage

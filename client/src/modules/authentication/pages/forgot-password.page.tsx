import { useLayoutEffect } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { SubmitHandler } from 'react-hook-form'
import clsx from 'clsx'
import { toast, API } from '@global'
import Form from '../components/form.component'
import { useClassNameContext } from '../providers'
import { sendResetEmailAPI } from '../services/auth.service'
import { FIELD } from '../constants'
import { AuthenticationInformation } from '../types'

const defaultValues: AuthenticationInformation = {
  email: '',
}

function ForgotPasswordPage() {
  const { className } = useClassNameContext()
  const {
    setTitle,
  }: { setTitle: React.Dispatch<React.SetStateAction<string>> } =
    useOutletContext()
  useLayoutEffect(() => {
    setTitle('forgot')
  }, [setTitle])

  const submitHandler: SubmitHandler<AuthenticationInformation> = async (
    data
  ) => {
    const response: API = await sendResetEmailAPI(data)
    toast.display(response.message, response.success ? 'success' : 'error')
  }

  return (
    <>
      <Form
        fieldList={FIELD.SEND_EMAIL}
        defaultValues={defaultValues}
        submitHandler={submitHandler}
        fieldClass={className}
        submitPlaceholder="Send Email"
      >
        <p className={clsx('text-center', 'my-1')}>--- or ---</p>
        <Link to="/login" className={clsx('link d-block', ' text-center fs-6')}>
          Turn back
        </Link>
      </Form>
    </>
  )
}

export default ForgotPasswordPage

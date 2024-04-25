import { useOutletContext } from 'react-router-dom'
import { SubmitHandler } from 'react-hook-form'
import { useClassNameContext } from '../providers'
import Form from '../components/form.component'
import { AuthenticationInformation, FormFieldProps } from '../types'
import { useLayoutEffect } from 'react'

const defaultValues: AuthenticationInformation = {
  email: '',
}

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
]
function ResetPasswordPage() {
  const { className } = useClassNameContext()
  const {
    setTitle,
  }: { setTitle: React.Dispatch<React.SetStateAction<string>> } =
    useOutletContext()
  useLayoutEffect(() => {
    setTitle('reset')
  }, [setTitle])

  const submitHandler: SubmitHandler<AuthenticationInformation> = (data) =>
    console.log(data)

  return (
    <>
      <Form
        fieldList={fieldList}
        defaultValues={defaultValues}
        submitHandler={submitHandler}
        fieldClass={className.formField}
        submitPlaceholder="Confirm"
      />
    </>
  )
}

export default ResetPasswordPage

import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { ClassNameProvider } from '../providers'
import { AuthenticationLayout } from '../layouts'

export default function AuthenticationHoc() {
  const [title, setTitle] = useState('')

  return (
    <ClassNameProvider>
      <AuthenticationLayout title={title}>
        <Outlet context={{ setTitle }} />
      </AuthenticationLayout>
    </ClassNameProvider>
  )
}

import { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthenticationContext, ClassNameProvider } from '../providers'
import { AuthenticationLayout } from '../layouts'

export default function AuthenticationHoc() {
  const { authenticationToken } = useAuthenticationContext()
  const [title, setTitle] = useState('')

  if (authenticationToken.isAuthenticated) {
    return <Navigate to="/" />
  }

  return (
    <ClassNameProvider>
      <AuthenticationLayout title={title}>
        <Outlet context={{ setTitle }} />
      </AuthenticationLayout>
    </ClassNameProvider>
  )
}

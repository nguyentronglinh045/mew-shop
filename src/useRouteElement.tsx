import { useRoutes } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import MainLayout from './layouts/MainLayout'
import path from './constants/path.ts'

const NotFound = lazy(() => import('./pages/NotFound'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))

export default function useRouteElement() {
  const routeElements = useRoutes([
    {
      path: '*',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <NotFound />
        </Suspense>
      )
    },
    {
      path: '',
      index: true,
      element: <MainLayout />
    },
    {
      path: path.login,
      element: (
        <Suspense>
          <Login />
        </Suspense>
      )
    },
    {
      path: path.register,
      element: (
        <Suspense>
          <Register />
        </Suspense>
      )
    }
  ])
  return routeElements
}

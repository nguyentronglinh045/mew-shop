import { useRoutes } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import MainLayout from './layouts/MainLayout'
import Login from './pages/Login'
import path from './constants/path.ts'

const NotFound = lazy(() => import('./pages/NotFound'))

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
    }
  ])
  return routeElements
}

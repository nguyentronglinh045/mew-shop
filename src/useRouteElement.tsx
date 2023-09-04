import { useRoutes } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import MainLayout from './layouts/MainLayout'

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
    }
  ])
  return routeElements
}

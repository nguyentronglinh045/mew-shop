import { useRoutes } from 'react-router-dom'
import { Suspense, lazy } from 'react'

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
      path: '/',
      index: true,
      element: <div>hello</div>
    }
  ])
  return routeElements
}

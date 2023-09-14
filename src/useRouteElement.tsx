import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import path from './constants/path.ts'
import MainLayout from './layouts/MainLayout/MainLayout.tsx'
import RegisterLayout from './layouts/RegisterLayout/RegisterLayout.tsx'

const Home = lazy(() => import('./pages/Home'))
const LoadingScreen = lazy(() => import('./pages/LoadingScreen'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Profile = lazy(() => import('./pages/User/Profile/index.ts'))

const isAuthenticated = false
function ProtectedRoute() {
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}
function RejectedRoute() {
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
}

export default function useRouteElement() {
  const routeElements = useRoutes([
    {
      path: '*',
      element: (
        <Suspense fallback={<LoadingScreen />}>
          <NotFound />
        </Suspense>
      )
    },
    {
      path: '/',
      index: true,
      element: (
        <Suspense fallback={<LoadingScreen />}>
          <MainLayout>
            <Home />
          </MainLayout>
        </Suspense>
      )
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '',
          element: <RegisterLayout />,
          children: [
            {
              path: path.login,
              element: (
                <Suspense fallback={<LoadingScreen />}>
                  <Login />
                </Suspense>
              )
            },
            {
              path: path.register,
              element: (
                <Suspense fallback={<LoadingScreen />}>
                  <Register />
                </Suspense>
              )
            }
          ]
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.user,
          element: <MainLayout />,
          children: [
            {
              path: path.profile,
              element: (
                <Suspense fallback={<LoadingScreen />}>
                  <Profile />
                </Suspense>
              )
            }
          ]
        }
      ]
    }
  ])
  return routeElements
}

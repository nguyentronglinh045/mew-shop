import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { Suspense, lazy, useContext } from 'react'
import path from './constants/path.ts'
import MainLayout from './layouts/MainLayout/MainLayout.tsx'
import RegisterLayout from './layouts/RegisterLayout/RegisterLayout.tsx'
import { AppContext } from './contexts/app.context.tsx'
import UserLayout from './layouts/UserLayout/UserLayout.tsx'

const Home = lazy(() => import('./pages/Home'))
const LoadingScreen = lazy(() => import('./pages/LoadingScreen'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const ProductList = lazy(() => import('./pages/ProductList'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Profile = lazy(() => import('./pages/User/Profile'))
const ChangePassword = lazy(() => import('./pages/User/ChangePassword'))
const Cart = lazy(() => import('./pages/Cart'))
const Contact = lazy(() => import('./pages/Contact'))

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}
function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
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
      element: <MainLayout />,
      children: [
        {
          path: '',
          element: (
            <Suspense fallback={<LoadingScreen />}>
              <Home />
            </Suspense>
          )
        },
        {
          path: path.productList,
          element: (
            <Suspense fallback={<LoadingScreen />}>
              <ProductList />
            </Suspense>
          )
        },
        {
          path: path.productDetail,
          element: (
            <Suspense fallback={<LoadingScreen />}>
              <ProductDetail />
            </Suspense>
          )
        },
        {
          path: path.contact,
          element: (
            <Suspense fallback={<LoadingScreen />}>
              <Contact />
            </Suspense>
          )
        }
      ]
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
              path: '',
              element: <UserLayout />,
              children: [
                {
                  path: path.profile,
                  element: (
                    <Suspense fallback={<LoadingScreen />}>
                      <Profile />
                    </Suspense>
                  )
                },
                {
                  path: path.changePassword,
                  element: (
                    <Suspense fallback={<LoadingScreen />}>
                      <ChangePassword />
                    </Suspense>
                  )
                }
              ]
            }
          ]
        },
        {
          path: path.cart,
          element: <MainLayout />,
          children: [
            {
              path: '',
              element: (
                <Suspense fallback={<LoadingScreen />}>
                  <Cart />
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

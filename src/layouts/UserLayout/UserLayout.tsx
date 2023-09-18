import { Outlet } from 'react-router-dom'
import UserSideNav from 'src/pages/User/UserSideNav'

export default function UserLayout() {
  return (
    <div className='bg-gray-200'>
      <div className='container'>
        <div className='grid grid-cols-4 gap-1 md:grid-cols-12'>
          <UserSideNav />
          <Outlet />
        </div>
      </div>
    </div>
  )
}

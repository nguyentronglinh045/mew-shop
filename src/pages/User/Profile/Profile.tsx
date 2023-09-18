import Button from 'src/components/Button'
import DateSelect from 'src/components/DateSelect'
import Input from 'src/components/Input'

export default function Profile() {
  return (
    <div className='col-span-4 p-4 shadow shadow-gray-500/50 md:col-span-8 lg:col-span-9'>
      <form noValidate className='bg-white p-4 md:px-8 md:py-4'>
        <h2 className='mb-2 text-center text-2xl font-bold'>Thông tin khách hàng</h2>

        <div className='flex flex-col'>
          <div className='mb-[1.25rem] flex items-center gap-1'>
            <span>Email:</span>
            <span>saosang@gmail.com</span>
          </div>
          <div className='flex flex-col gap-1'>
            <span>Tên</span>
            <Input
              classNameInput='w-full rounded-md px-3 py-2 text-black outline-none border border-slate-500 focus:border-gray-500 focus:shadow-sm'
              name='name'
              placeholder='Tên'
            />
          </div>
          <div className='flex flex-col gap-1'>
            <span>Số điện thoại</span>
            <Input
              classNameInput='w-full rounded-md px-3 py-2 text-black outline-none border border-slate-500 focus:border-gray-500 focus:shadow-sm'
              name='name'
              placeholder='Tên'
            />
          </div>
          <div className='flex flex-col gap-1'>
            <span>Địa chỉ</span>
            <Input
              classNameInput='w-full rounded-md px-3 py-2 text-black outline-none border border-slate-500 focus:border-gray-500 focus:shadow-sm'
              name='name'
              placeholder='Tên'
            />
          </div>
          <DateSelect />
        </div>
        <Button className='rounded-md bg-main-color px-4 py-2 text-white hover:bg-main-color/80'>Lưu</Button>
      </form>
    </div>
  )
}

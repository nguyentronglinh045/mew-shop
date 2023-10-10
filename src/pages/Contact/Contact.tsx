import Button from 'src/components/Button'
import Input from 'src/components/Input'
import InputNumber from 'src/components/InputNumber'

export default function Contact() {
  return (
    <div className='bg-[#f3f3f3]'>
      <div className='container bg-transparent p-2 md:p-5'>
        <div className='grid grid-cols-1 md:gap-5 lg:grid-cols-2'>
          <div className='col-span-2 flex flex-col gap-5 lg:col-span-1'>
            <div className='rounded-md border border-solid border-main-color pb-2'>
              <h4 className='rounded-t-md bg-main-color px-3 py-1 text-base font-bold text-white md:text-lg'>
                Thông tin liên hệ
              </h4>
              <div className='grid gap-2 p-2 md:grid-cols-2'>
                <div className='flex items-center gap-1 md:col-span-1'>
                  <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-solid border-main-color fill-none stroke-main-color'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      strokeWidth={2}
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='lucide lucide-map-pin h-5 w-5'
                    >
                      <path d='M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z' />
                      <circle cx={12} cy={10} r={3} />
                    </svg>
                  </div>
                  <div className='flex flex-col gap-1 text-sm'>
                    <b>Địa chỉ</b>
                    <p>70 Lữ Gia, Phường 15, Quận 11, TP.HCM</p>
                  </div>
                </div>
                <div className='flex items-center gap-1 md:col-span-1'>
                  <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-solid border-main-color fill-none stroke-main-color'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      strokeWidth={2}
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='lucide lucide-clock h-5 w-5'
                    >
                      <circle cx={12} cy={12} r={10} />
                      <polyline points='12 6 12 12 16 14' />
                    </svg>
                  </div>
                  <div className='flex flex-col gap-1 text-sm'>
                    <b>Thời gian làm việc</b>
                    <p>8h - 22h Từ thứ 2 đến chủ nhật</p>
                  </div>
                </div>
                <div className='flex items-center gap-1 md:col-span-1'>
                  <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-solid border-main-color fill-none stroke-main-color'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      strokeWidth={2}
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='lucide lucide-phone-call h-5 w-5'
                    >
                      <path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' />
                      <path d='M14.05 2a9 9 0 0 1 8 7.94' />
                      <path d='M14.05 6A5 5 0 0 1 18 10' />
                    </svg>
                  </div>
                  <div className='flex flex-col gap-1 text-sm'>
                    <b>Hotline</b>
                    <p>1900 1234</p>
                  </div>
                </div>
                <div className='flex items-center gap-1 md:col-span-1'>
                  <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-solid border-main-color fill-none stroke-main-color'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      strokeWidth={2}
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='lucide lucide-mail h-5 w-5'
                    >
                      <rect width={20} height={16} x={2} y={4} rx={2} />
                      <path d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7' />
                    </svg>
                  </div>
                  <div className='flex flex-col gap-1 text-sm'>
                    <b>Email</b>
                    <p>example@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='rounded-md border border-solid border-main-color pb-2'>
              <h4 className='rounded-t-md bg-main-color px-3 py-1 text-base font-bold text-white md:text-lg'>
                Liên hệ với chúng tôi
              </h4>
              <div className='my-2 px-3 py-1 text-sm text-gray-500'>
                Nếu bạn có thắc mắc gì, có thể gửi yêu cầu cho chúng tôi, và chúng tôi sẽ liên lạc lại với bạn sớm nhất
                có thể .
              </div>
              <form className='flex flex-col gap-3 px-3 py-1'>
                <Input
                  name='name'
                  placeholder='Họ tên'
                  classNameInput='w-full rounded-md border border-gray-300 py-2 px-3 outline-none focus:border-gray-500 focus:shadow-sm'
                  classNameError='hidden'
                />
                <Input
                  name='email'
                  classNameInput='w-full rounded-md border border-gray-300 py-2 px-3 outline-none focus:border-gray-500 focus:shadow-sm'
                  classNameError='hidden'
                />
                <InputNumber
                  classNameInput='w-full rounded-md border border-gray-300 py-2 px-3 outline-none focus:border-gray-500 focus:shadow-sm'
                  classNameError='hidden'
                />
                <Button type='submit' className='w-1/3 rounded-md bg-main-color px-3 py-2 font-semibold text-white'>
                  Send
                </Button>
              </form>
            </div>
          </div>
          <div className='col-span-2 bg-red-300 md:col-span-1'>map</div>
        </div>
      </div>
    </div>
  )
}

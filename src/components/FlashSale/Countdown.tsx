import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const Countdown = () => {
  const { t } = useTranslation()
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  // Tính thời gian còn lại
  useEffect(() => {
    let targetDate = new Date('2024-02-10T00:00:00').getTime() // Ngày bắt đầu gốc

    const updateTargetDate = () => {
      const now = new Date().getTime()
      while (targetDate <= now) {
        const d = new Date(targetDate)
        d.setMonth(d.getMonth() + 1)
        targetDate = d.getTime()
      }
    }

    // Cập nhật ngay targetDate cho tương lai gần nhất
    updateTargetDate()

    const interval = setInterval(() => {
      const now = new Date().getTime()
      let timeRemaining = targetDate - now

      // Nếu đã hết thời gian, tự động tăng thêm 1 tháng
      if (timeRemaining <= 0) {
        updateTargetDate()
        timeRemaining = targetDate - now
      }

      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24))
      const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000)

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds
      })
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className='flex gap-1'>
      <div className='border-2 border-white p-2'>
        <span className='font-semibold uppercase text-white'>
          {timeLeft.days}&nbsp;{t('ProductList.days')}
        </span>
      </div>
      <div className='border-2 border-white p-2'>
        <span className='font-semibold uppercase text-white'>
          {timeLeft.hours < 10 ? '0' + timeLeft.hours : timeLeft.hours}
        </span>
      </div>
      <div className='border-2 border-white p-2'>
        <span className='font-semibold uppercase text-white'>
          {timeLeft.minutes < 10 ? '0' + timeLeft.minutes : timeLeft.minutes}
        </span>
      </div>
      <div className='border-2 border-white p-2'>
        <span className='font-semibold uppercase text-white'>
          {timeLeft.seconds < 10 ? '0' + timeLeft.seconds : timeLeft.seconds}
        </span>
      </div>
    </div>
  )
}

export default Countdown

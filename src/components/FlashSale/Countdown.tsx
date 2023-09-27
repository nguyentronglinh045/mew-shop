import { useState, useEffect } from 'react'

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  // Tính thời gian còn lại
  useEffect(() => {
    const targetDate = new Date('2024-02-10 00:00:00').getTime() // Thay đổi ngày cần đếm ngược đến
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const timeRemaining = targetDate - now
      if (timeRemaining <= 0) {
        clearInterval(interval)
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        })
      } else {
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
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className='flex gap-1'>
      <div className='border-2 border-white p-2'>
        <span className='font-semibold uppercase text-white'>{timeLeft.days}&nbsp;ngày</span>
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

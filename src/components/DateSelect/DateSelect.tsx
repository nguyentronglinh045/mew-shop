import { range } from 'lodash'
import { useState } from 'react'

interface Props {
  onChange?: (value: Date) => void
  value?: Date
  errorMessage?: string
}
export default function DateSelect({ value, onChange, errorMessage }: Props) {
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  })

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = event.target
    const newDate = {
      ...date,
      [name]: value
    }
    setDate(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
  }
  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-row justify-between gap-1'>
        <select
          value={value?.getDate() || date.date}
          onChange={handleChange}
          name='date'
          className='h-10 w-[32%] cursor-pointer rounded-md border border-black/10 px-3 duration-200 hover:border-main-color'
        >
          {range(1, 32).map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
        <select
          value={value?.getMonth() || date.month}
          onChange={handleChange}
          name='month'
          className='h-10 w-[32%] cursor-pointer rounded-md border border-black/10 px-3 duration-200 hover:border-main-color'
        >
          {range(0, 12).map((item) => (
            <option value={item} key={item}>
              {item + 1}
            </option>
          ))}
        </select>
        <select
          value={value?.getFullYear() || date.year}
          onChange={handleChange}
          name='year'
          className='h-10 w-[32%] cursor-pointer rounded-md border border-black/10 px-3 duration-200 hover:border-main-color'
        >
          {range(1990, 2024).map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errorMessage}</div>
    </div>
  )
}

import InputNumber, { InputNumberProps } from '../InputNumber'

interface Props extends InputNumberProps {
  max?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onType?: (value: number) => void
  onFocusOut?: (value: number) => void
  classNameWrapper?: string
  classNameButtonControl?: string
}
export default function QuantityController({
  max,
  onIncrease,
  onDecrease,
  classNameWrapper,
  onFocusOut,
  classNameButtonControl = 'flex h-8 w-8 items-center justify-center border border-gray-300 text-gray-600',
  onType,
  value,
  ...rest
}: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(event.target.value)
    if (max !== undefined && _value > max) {
      _value = max
    } else if (_value < 1) {
      _value = 1
    }
    onType && onType(_value)
  }
  const increase = () => {
    let _value = Number(value) + 1
    if (max !== undefined && _value > max) {
      _value = max
    }
    onIncrease && onIncrease(_value)
  }
  const decrease = () => {
    let _value = Number(value) - 1
    if (_value < 1) {
      _value = 1
    }
    onDecrease && onDecrease(_value)
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    onFocusOut && onFocusOut(Number(event.target.value))
  }
  return (
    <div className={'flex items-center ' + classNameWrapper}>
      <button className={`rounded-l-md ${classNameButtonControl}`} onClick={decrease}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width={20}
          height={20}
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth={2}
          strokeLinecap='round'
          strokeLinejoin='round'
          className='lucide lucide-minus'
        >
          <path d='M5 12h14' />
        </svg>
      </button>
      <InputNumber
        classNameInput='h-8 w-14 text-center grow border border-gray-300 text-gray-600 outline-none p-1'
        classNameError='hidden'
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        {...rest}
      />
      <button className={`rounded-r-md ${classNameButtonControl}`} onClick={increase}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width={20}
          height={20}
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth={2}
          strokeLinecap='round'
          strokeLinejoin='round'
          className='lucide lucide-plus'
        >
          <path d='M5 12h14' />
          <path d='M12 5v14' />
        </svg>
      </button>
    </div>
  )
}

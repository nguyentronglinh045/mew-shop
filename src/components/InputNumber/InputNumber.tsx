import { forwardRef, InputHTMLAttributes, useState } from 'react'
export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberInner(
  {
    errorMessage,
    className,
    classNameInput = 'w-full rounded-sm border border-gray-300 py-3 px-6 outline-none focus:border-gray-500 focus:shadow-sm',
    classNameError = 'mt-1 min-h-[1.25rem] text-sm text-red-600',
    onChange,
    value = '',
    ...rest
  },
  ref
) {
  const [localValue, setLocalValue] = useState<string>(value as string)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (/^\d+$/.test(value) || value === '') {
      // thực thi onChange callback từ bên ngoài truyền vào props
      onChange && onChange(event)
      // cập nhật localValue
      setLocalValue(value)
    }
  }
  return (
    <div className={className}>
      <input
        className={classNameInput}
        value={value === undefined ? localValue : value}
        onChange={handleChange}
        {...rest}
        ref={ref}
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
})
export default InputNumber

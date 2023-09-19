import { useRef } from 'react'
import { toast } from 'react-toastify'

interface Props {
  onChange?: (file: File) => void
}
const avtSize = import.meta.env.VITE_SIZE_AVATAR_FILE
export default function InputFile({ onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0]
    fileInputRef.current?.setAttribute('value', '')
    if ((fileFromLocal && fileFromLocal.size >= Number(avtSize)) || !fileFromLocal?.type.includes('image')) {
      toast.error(`Dung lượng file tối đa 1 MB. Định dạng:.JPEG, .PNG`, {
        position: 'top-center'
      })
    } else {
      onChange && onChange(fileFromLocal)
    }
  }
  const handleUpload = () => {
    fileInputRef.current?.click()
  }
  return (
    <div>
      <input
        type='file'
        className='hidden'
        accept='.jpg,.jpeg,.png'
        ref={fileInputRef}
        onChange={onFileChange}
        onClick={(event) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ;(event.target as any).value = null
        }}
      />
      <button
        className='grow rounded-md border border-main-color bg-transparent px-4 py-2 font-bold text-red-500 duration-200 hover:bg-main-color/80 hover:text-white active:bg-main-color active:text-white'
        type='button'
        onClick={handleUpload}
      >
        Chọn ảnh
      </button>
    </div>
  )
}

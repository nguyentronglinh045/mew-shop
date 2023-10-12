import { useEffect } from 'react'
import ReactDOM from 'react-dom'

interface Props {
  children?: React.ReactNode
}
// Component này sẽ đưa childrent ra ngoài body
export default function PortalComponent({ children }: Props) {
  const portalContainer = document.createElement('div')
  portalContainer.style.position = 'absolute'
  portalContainer.style.top = '0'
  portalContainer.style.right = '0'
  portalContainer.style.bottom = '0'
  portalContainer.style.left = '0'
  useEffect(() => {
    document.body.appendChild(portalContainer)

    return () => {
      document.body.removeChild(portalContainer)
    }
  }, [portalContainer])

  // Sử dụng createPortal để đưa phần tử ra ngoài body
  return ReactDOM.createPortal(children, portalContainer)
}

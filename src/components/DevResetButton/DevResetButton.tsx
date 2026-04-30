import { useState } from 'react'
import { resetDB } from 'src/db'
import { clearDataFromLS } from 'src/utils/auth'

export default function DevResetButton() {
  const [busy, setBusy] = useState(false)

  const handleReset = async () => {
    if (busy) return
    if (!confirm('Reset toàn bộ dữ liệu demo (RxDB + localStorage) và reload?')) return
    setBusy(true)
    try {
      clearDataFromLS()
      await resetDB()
    } finally {
      location.reload()
    }
  }

  return (
    <button
      type='button'
      onClick={handleReset}
      disabled={busy}
      title='Reset demo data (dev only)'
      style={{
        position: 'fixed',
        bottom: 12,
        left: 12,
        zIndex: 9999,
        padding: '6px 10px',
        fontSize: 12,
        background: '#fff',
        color: '#b91c1c',
        border: '1px solid #b91c1c',
        borderRadius: 6,
        cursor: busy ? 'wait' : 'pointer',
        opacity: 0.85
      }}
    >
      {busy ? 'Resetting...' : 'Reset demo data'}
    </button>
  )
}

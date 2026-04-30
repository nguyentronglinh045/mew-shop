import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'src/i18n/i18n'
import App from './App.tsx'
import './index.css'
import { AppProvider } from './contexts/app.context.tsx'
import { createDB } from './db'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
})

const renderSplash = () => {
  const root = document.getElementById('root')
  if (!root) return
  root.innerHTML =
    '<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;color:#555">Đang khởi tạo dữ liệu...</div>'
}

const bootstrap = async () => {
  renderSplash()
  await createDB()
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <App />
          </AppProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </React.StrictMode>
  )
}

bootstrap().catch((err) => {
  console.error('[mew-shop] DB init failed:', err)
  const root = document.getElementById('root')
  if (root) {
    root.innerHTML =
      '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;color:#b00;gap:12px"><div>Lỗi khởi tạo dữ liệu local.</div><button id="mew-reset" style="padding:8px 16px;border:1px solid #b00;background:#fff;cursor:pointer">Reset & Reload</button></div>'
    document.getElementById('mew-reset')?.addEventListener('click', () => {
      indexedDB.databases?.().then((dbs) => {
        dbs.forEach((d) => d.name && indexedDB.deleteDatabase(d.name))
        location.reload()
      })
    })
  }
})

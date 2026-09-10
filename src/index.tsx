import { createRoot, } from 'react-dom/client'
import '@/app/styles/tailwind.css'
import App from './app/App'
import { HelmetProvider } from 'react-helmet-async'

const container = document.getElementById('root')
if (!container) {
    throw new Error('Контейнер root не найден')
}

const root = createRoot(container)

root.render(
    <HelmetProvider>
        <App />
    </HelmetProvider>
)

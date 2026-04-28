
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import './index.css'
import './styles/platform.css'
import App from './App.jsx'
import { PlatformProvider } from './context/PlatformContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <PlatformProvider>
            <App />
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: 'rgba(15, 23, 42, 0.92)',
                        color: '#f8fafc',
                        border: '1px solid rgba(99, 102, 241, 0.3)',
                    },
                }}
            />
        </PlatformProvider>
    </AuthProvider>
)

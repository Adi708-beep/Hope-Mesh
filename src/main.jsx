
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/platform.css'
import App from './App.jsx'
import { PlatformProvider } from './context/PlatformContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <PlatformProvider>
            <App />
        </PlatformProvider>
    </AuthProvider>
)

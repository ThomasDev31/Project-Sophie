import { createRoot } from 'react-dom/client'

import App from './App.jsx';
import './index.css';
import { AuthProvider } from './assets/layout/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <App />
    </AuthProvider>
)

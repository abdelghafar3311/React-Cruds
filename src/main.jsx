import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ContextShare } from './Data/Context/context';


createRoot(document.getElementById('root')).render(
  <ContextShare>
    <App />
  </ContextShare>,
)

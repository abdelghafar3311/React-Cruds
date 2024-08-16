// React Tools
import { createRoot } from 'react-dom/client';
// App Component
import App from './App.jsx';
// css file
import './index.css';
// context
import { ContextShare } from './Data/Context/context';


createRoot(document.getElementById('root')).render(
  <ContextShare>
    <App />
  </ContextShare>,
)

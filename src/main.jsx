import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';  // Yeh line merge karni thi
import { BrowserRouter } from 'react-router-dom';
import GlobalProvider from './context/Context.jsx';

createRoot(document.getElementById('root')).render(
  <GlobalProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GlobalProvider>
);

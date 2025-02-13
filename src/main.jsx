
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
<<<<<<< HEAD
=======
import './index.css'
>>>>>>> fe44b36 (post & another post)
import { BrowserRouter } from 'react-router-dom';
import GlobalProvider from './context/Context.jsx';

createRoot(document.getElementById('root')).render(
  
    <GlobalProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GlobalProvider>
 
);

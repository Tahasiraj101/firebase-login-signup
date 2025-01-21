import { useContext, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Navigate, Route, Routes } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import { GlobalContext } from './context/Context';
import './App.css'

function App() {
  const { state, dispatch } = useContext(GlobalContext);

  console.log('Global State:', state);

  const firebaseConfig = {
    apiKey: 'AIzaSyB_s1iVn3Jfh89UGwYc71NqcdyvVVhtq2U',
    authDomain: 'social-app-16245.firebaseapp.com',
    projectId: 'social-app-16245',
    storageBucket: 'social-app-16245.firebaseapp.com',
    messagingSenderId: '1001149939088',
    appId: '1:1001149939088:web:114227a9384348a5154715',
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: 'USER_LOGIN', payload: user });
        console.log('User logged in:', user);
      } else {
        dispatch({ type: 'USER_LOGOUT' });
        console.log('User logged out');
      }
    });
  }, []);


  return (

    <div>

      {(state?.isLogin == true) ?
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to='/' />} />
        </Routes>
        :
        (state?.isLogin == false) ?
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to='/login' />} />
        </Routes>   
        :<p>loading.....</p>  
      }

    </div>



  );
}

export default App;

import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, GithubAuthProvider , GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { Link } from 'react-router-dom';
import './Login.css';
import { FaGithub , FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  const signupWithGithub = () =>{
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    console.log('github user logi^^', user)
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GithubAuthProvider.credentialFromError(error);
    console.log('github error arha hai yarrrrrrr', error)
  })
  }

  const signupWithGoogle = () =>{
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log("signup with google succes" , user)
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log("google error", error)
    });
  
  }

  const signupWithFacebook = () =>{
    const provider = new FacebookAuthProvider()
    signInWithPopup(auth, provider)
    .then((result) => {
    const user = result.user;
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;
    console.log(user)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = FacebookAuthProvider.credentialFromError(error);
    console.log("error", error)
  });
  }
  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        
        alert("Login successfully")
      })
      .catch((error) => {
        alert("'user not found")
        console.error('user not found:', error.message);
      });
  };

  const forgotPassword = (e) => {
    e.preventDefault();
    if (!email) {
      console.error('Please provide an email address to reset the password.');
      alert("Please provide an email address to reset the password")
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent successfully")
        

      })
      .catch((error) => {
        console.error('Error sending password reset email:', error.message);
      });
  };

  return (
    <div className='login-container'>
<<<<<<< HEAD
      <form onSubmit={login}>
=======
     <div className='form-conatiner-btn'>
     <form onSubmit={login}>
>>>>>>> fe44b36 (post & another post)
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </label>
        <br />
        <label htmlFor="password">
          Password:
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </label>
        <Link className='forgot-password-button' onClick={forgotPassword} type="button">Forgot Password</Link>
        <br />
        <p>
          Don't have an account? <Link to='/signup' className='link'>Sign up</Link>
        </p>
       
        <button type="submit">Login</button>
<<<<<<< HEAD
=======
      
      </form>
>>>>>>> fe44b36 (post & another post)
      <div className="btn">
      <button onClick={signupWithGithub}>Signin Github <span className='github'><FaGithub /></span> </button>
      <button onClick={signupWithGoogle}>Signin Google <span className='google'><FcGoogle /></span></button>
      <button onClick={signupWithFacebook}>Signin Facebook <span className='facebook'><FaFacebook/></span></button>
      </div>
<<<<<<< HEAD
      </form>
=======
     </div>
>>>>>>> fe44b36 (post & another post)
    </div>
  );
};

export default Login;

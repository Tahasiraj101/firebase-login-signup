import React, { useState } from 'react';
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';
import { Link } from 'react-router-dom';
import './Login.css';
import { FaGithub, FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();

  const signupWithGithub = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log('github user login:', user);
      })
      .catch((error) => {
        console.log('github error:', error);
      });
  };

  const signupWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log('signup with google success:', user);
      })
      .catch((error) => {
        console.log('google error:', error);
      });
  };

  const signupWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log('facebook login success:', user);
      })
      .catch((error) => {
        console.log('facebook error:', error);
      });
  };

  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert('Login successfully');
      })
      .catch(() => {
        alert('User not found');
      });
  };

  const forgotPassword = (e) => {
    e.preventDefault();
    if (!email) {
      alert('Please provide an email address to reset the password');
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('Password reset email sent successfully');
      })
      .catch((error) => {
        console.error('Error sending password reset email:', error.message);
      });
  };

  return (
    <div className="login-container">
      <div className="form-container-btn">
        <form onSubmit={login}>
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
          <Link className="forgot-password-button" onClick={forgotPassword} type="button">
            Forgot Password
          </Link>
          <br />
          <p>
            Don't have an account? <Link to="/signup" className="link">Sign up</Link>
          </p>
          <button type="submit">Login</button>
        </form>
        <div className="btn">
          <button onClick={signupWithGithub}>
            Sign in with GitHub <span className="github"><FaGithub /></span>
          </button>
          <button onClick={signupWithGoogle}>
            Sign in with Google <span className="google"><FcGoogle /></span>
          </button>
          <button onClick={signupWithFacebook}>
            Sign in with Facebook <span className="facebook"><FaFacebook /></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

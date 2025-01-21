import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { Link } from 'react-router-dom';
import './Signup.css'

const Signup = () => {

  const [email, setEmail] = useState("");
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  const signup = (e) => {
    e.preventDefault()
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log('res', user)
        updateProfile(auth.currentUser, {
          displayName: username, photoURL: "https://example.com/jane-q-user/profile.jpg"
        })
          .then((res) => {
            const auth = getAuth();
            sendEmailVerification(auth.currentUser)
              .then((res) => {
               
              })
              console.log("updateprofile", res)
              alert("successfully signup")
              .catch((error) => {
                console.log('not sent', error)
              })
              
            })
            .catch((error) => {
              console.log(error)
              
            });
            // ...
          })
          .catch((error) => {
        alert("Email-already-in-use")
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error", error)
      });
  }

  return (
    <div className="signup-container">
      <form onSubmit={signup}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          className="form-input"
          value={username}
          onChange={(e) => { setusername(e.target.value) }}
        />
        <br />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className="form-input"
          value={email}
          onChange={(e) => { setEmail(e.target.value) }}
        />
        <br />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className="form-input"
          value={password}
          onChange={(e) => { setPassword(e.target.value) }}
        />
        <br />

        <p className="form-link">
          If you have an account, <Link to='/login' className="link">Login</Link>
        </p>

        <button type="submit" className="form-button">Signup</button>
      </form>
    </div>

  )
}

export default Signup

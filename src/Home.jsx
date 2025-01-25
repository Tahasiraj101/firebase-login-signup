import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from './context/Context';
import { getAuth, signOut , verifyBeforeUpdateEmail } from 'firebase/auth';
import './Home.css'

const Home = () => {
    const { state, dispatch } = useContext(GlobalContext);
    const [newEmail, setnewEmail] = useState("");
    const [showEmail, setshowEmail] = useState(false);

    const logout = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                dispatch({ type: 'USER_LOGOUT' });
                console.log('User logged out successfully');
                alert('User logged out successfully')
            })
            .catch((error) => {
                alert("Error during logout")
                console.error('Error during logout:', error);
            });
        };
        
        const toggleEmailForm = () => {
            setshowEmail((prev) => !prev);
        };

    const changeEmail = (e) =>{
        e.preventDefault()
        const auth = getAuth();
        verifyBeforeUpdateEmail(auth.currentUser, newEmail)
        .then((res) => {
            console.log(res , 'verification sent successfully ')
            alert('verification sent successfully')
          }).catch((error) => {
            console.log(error , 'verification NOT sent!')
          });
    }
    return (
        <div>
    <header id="main-header">
        <nav>
            <h1>Logo</h1>
            {state?.isLogin === true ? (
                <button id="logout-btn" onClick={logout}>Logout</button>
            ) : (
                <ul>
                    <li>
                        <Link to="/login" className="nav-link">Login</Link>
                    </li>
                    <li>
                        <Link to="/signup" className="nav-link">Signup</Link>
                    </li>
                </ul>
            )}
        </nav>
    </header>

    <div id='home-main-container'>
    <div className="user-info">
        <img src={state?.user?.photoURL} alt="" />
        <h1 id="user-name">{state?.user?.displayName}</h1>
        <h2 id="user-email">{state?.user?.email}</h2>
    </div>

    <div id='change-email'>
    <button id="change-email-btn" onClick={toggleEmailForm}>
        {showEmail ? "Cancel" : "Change Email"}
    </button>

    {showEmail && (
        <form id="change-email-form" onSubmit={changeEmail}>
            <label>
                Change email:
                <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setnewEmail(e.target.value)}
                    id="new-email-input"
                />
            </label>
            <br />
            <button type="submit" id="submit-btn">Submit</button>
        </form>
    )}
    </div>
    </div>
</div>

    );
};

export default Home;

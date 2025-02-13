import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from './context/Context';
import { getAuth, signOut, verifyBeforeUpdateEmail } from 'firebase/auth';
import { addDoc, collection, getFirestore, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";
import './Home.css';
import './index.css';
import { ClipLoader } from 'react-spinners';
import moment from 'moment';
import Swal from 'sweetalert2';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';

const Home = () => {
    const { state, dispatch } = useContext(GlobalContext);
    const [newEmail, setNewEmail] = useState("");
    const [showEmail, setShowEmail] = useState(false);
    const [caption, setCaption] = useState("");
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [file, setFile] = useState();
    const db = getFirestore();

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
            const postList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setPosts(postList);
        });

        return () => unsubscribe();
    }, []);

    const logout = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                dispatch({ type: 'USER_LOGOUT' });
                Swal.fire('Logged Out', 'You have logged out successfully', 'success');
            })
            .catch((error) => {
                Swal.fire('Error', 'Error during logout', 'error');
                console.error('Error during logout:', error);
            });
    };

    const toggleEmailForm = () => {
        setShowEmail(prev => !prev);
    };

    const changeEmail = (e) => {
        e.preventDefault();
        const auth = getAuth();
        verifyBeforeUpdateEmail(auth.currentUser, newEmail)
            .then(() => {
                Swal.fire('Success', 'Verification email sent successfully!', 'success');
            })
            .catch((error) => {
                Swal.fire('Error', 'Verification email not sent!', 'error');
                console.error(error);
            });
    };

    const addPost = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "post-images");

        try {
            Swal.fire({
                title: 'Uploading...',
                text: 'Please wait while we upload your image',
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            const res = await axios.post("https://api.cloudinary.com/v1_1/dt30qnuro/upload", formData);
            const imageUrl = res.data.secure_url;

            await addDoc(collection(db, "posts"), {
                userId: state?.user?.uid,
                caption: caption,
                userName: state?.user.displayName,
                userProfile: state?.user?.photoURL,
                createdAt: new Date().getTime(),
                imageUrl: imageUrl,
            });

            Swal.close();
            setCaption("");
            setFile(null);
            Swal.fire('Success', 'Post created successfully!', 'success');
        } catch (error) {
            Swal.close();
            Swal.fire('Error', 'There was an issue uploading your post', 'error');
            console.error("Cloudinary upload error:", error);
        } finally {
            setLoading(false);
        }
    };

    const editPost = (id, caption) => {
        Swal.fire({
            title: 'Edit your post',
            input: 'textarea',
            inputValue: caption,
            showCancelButton: true,
            confirmButtonText: 'Save Changes',
            showLoaderOnConfirm: true,
            preConfirm: (newCaption) => {
                if (!newCaption) {
                    Swal.showValidationMessage('Caption cannot be empty');
                    return;
                }

                const postRef = doc(db, "posts", id);
                return updateDoc(postRef, { caption: newCaption }).then(() => {
                    Swal.fire('Updated!', 'Your post has been updated.', 'success');
                }).catch((error) => {
                    Swal.fire('Error', 'Failed to update the post', 'error');
                    console.error('Error updating post:', error);
                });
            }
        });
    };

    const deletePost = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Once deleted, you won't be able to recover this post!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                const postRef = doc(db, "posts", id);
                return deleteDoc(postRef).then(() => {
                    Swal.fire('Deleted!', 'Your post has been deleted.', 'success');
                }).catch((error) => {
                    Swal.fire('Error', 'Failed to delete the post', 'error');
                    console.error('Error deleting post:', error);
                });
            }
        });
    };

    return (
        <div className="home-container">
            <header className="main-header">
                <h1>Logo</h1>
                {state?.isLogin ? (
                    <button id="logout-btn" onClick={logout}>Logout</button>
                ) : (
                    <ul>
                        <li><Link to="/login" className="nav-link">Login</Link></li>
                        <li><Link to="/signup" className="nav-link">Signup</Link></li>
                    </ul>
                )}
            </header>

            <div id="home-main-container">
                <div className="user-info">
                    <img src={state?.user?.photoURL} alt="Profile" width={100} height={100} />
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
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    id="new-email-input"
                                />
                            </label>
                            <br />
                            <button type="submit" id="submit-btn">Submit</button>
                        </form>
                    )}
                </div>

                <div className="add-post">
                    {loading ? (
                        <div className="loader">
                            <ClipLoader color="#fff" size={50} />
                        </div>
                    ) : (
                        <form onSubmit={addPost}>
                            <textarea
                                placeholder="Write something..."
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                            />
                            <input
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                            <button type="submit">Add Post</button>
                        </form>
                    )}
                </div>

                {posts.map(post => (
                    <div className="post-card" key={post.id}>
                        <div className="profileLogo">
                            <img src={post.userProfile} alt="profile" width={50} />
                            <div className='username-date'>
                                <p>{post.userName}</p>
                                <small>{moment(post.createdAt).fromNow()}</small>
                            </div>
                        </div>
                        <div className="post-content">
                            <p>{post.caption}</p>
                            <img src={post.imageUrl} alt="post" width={350} />
                        </div>
                        <div className="post-actions">
                            <button className="edit-btn" onClick={() => editPost(post.id, post.caption)}>
                                <FaEdit /> Edit
                            </button>
                            <button className="delete-btn" onClick={() => deletePost(post.id)}>
                                <FaTrash /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;

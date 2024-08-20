import { Link } from 'react-router-dom';
import './Signup.css';
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setusername] = useState("");
    const [error, setError] = useState(null);
    const [passErr, setPassErr] = useState(null);
    const [nameError, setNameError] = useState(null);
    const style = {
        backgroundColor: '#e3f2fd', // Light blue background for the whole page
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    const handleEmailChange = (event) => {
        const emailValue = event.target.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmail(event.target.value);
        if (emailRegex.test(emailValue)) {
            setError(null);
        } else {
            setError('Invalid email address');
        }
    };

    const handlePassword = (event) => {
        const passValue = event.target.value;
        setPassword(event.target.value);
        if (passValue.length <= 5) {
            setPassErr('Password length must be more than 5 characters');
        } else {
            setPassErr(null);
        }
    };

    const checkUserName = (e) => {
        const username = e.target.value.trim();
        let status = true;

        if (username.length === 0) {
            setNameError("Name is required");
            status = false;
        } else if (!/^[a-zA-Z ]+$/.test(username)) {
            setNameError("Name must be alphabetic characters only");
            status = false;
        } else {
            setNameError(null);
            setusername(username);
            status = true;
        }
        return status;
    };

    const Register = (e) => {
        e.preventDefault();
        if (checkUserName && username && password && email) {
            axios.post("http://localhost:3001/user/SignUp", { email, password, username })
                .then(result => {
                    if (result.data.message === 'User already exist') {
                        Swal.fire({
                            icon: "error",
                            title: "Account already exists",
                        });
                    } else {
                        const token = result.data.token;
                        console.log(token)
                        Cookies.set('token', token, { expires: 7, secure: true });
                        Swal.fire({
                            icon: "success",
                            title: "Account created successfully",
                        });
                    }
                    setEmail("");
                    setPassword("");
                    setusername("");
                    e.target.reset();
                })
                .catch(err => {
                    Swal.fire({
                        icon: "error",
                        title: "Something went wrong",
                    });
                });
        }
    };

    return (
        <section style={style}>
            <div id="form-container-signup">
                <div id="form">
                    <form onSubmit={Register}>
                        <h3>Create Account Here</h3>
                        <label htmlFor="username">Username</label>
                        <input required onChange={checkUserName} type="text" placeholder="Enter your username" />
                        {nameError && <div style={{ color: 'red' }}>{nameError}</div>}
                        <label htmlFor="email">Email</label>
                        <input required onChange={handleEmailChange} type="text" value={email} placeholder="Enter your email" />
                        {error && <div style={{ color: 'red' }}>{error}</div>}
                        <label htmlFor="password">Password</label>
                        <input required onChange={handlePassword} type="password" value={password} placeholder="Enter your password" />
                        {passErr && <div style={{ color: 'red' }}>{passErr}</div>}
                        <button type="submit" className='mb-2'>Register</button>
                        <Link to="/signin">
                            <p>Already have an account? Sign in here</p>
                        </Link>
                    </form>
                </div>
                <div id="right-signup">
                </div> {/* This is the right section with the image */}
            </div>
        </section>
    );
}

export default Signup;
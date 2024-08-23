import { Link, useNavigate } from 'react-router-dom';
import '../../assets/css/Signup.css';
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

function Signup() {
    // State variables to manage input values and error messages
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState(null);
    const [passErr, setPassErr] = useState(null);
    const [nameError, setNameError] = useState(null);
    
    // Hook for programmatic navigation
    const navigate = useNavigate();

    // Style object for the signup page layout
    const style = {
        backgroundColor: '#e3f2fd', // Light blue background for the whole page
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    // Handler for email input change
    const handleEmailChange = (event) => {
        const emailValue = event.target.value;
        // Basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmail(emailValue);
        if (emailRegex.test(emailValue)) {
            setError(null); // Clear error if email is valid
        } else {
            setError('Invalid email address'); // Set error message if email is invalid
        }
    };

    // Handler for password input change
    const handlePasswordChange = (event) => {
        const passValue = event.target.value;
        setPassword(passValue);
        if (passValue.length <= 5) {
            setPassErr('Password length must be more than 5 characters'); // Set error for short passwords
        } else {
            setPassErr(null); // Clear error if password length is sufficient
        }
    };

    // Handler for username input change
    const handleUsernameChange = (event) => {
        const username = event.target.value.trim();
        let status = true;

        // Check if username is empty
        if (username.length === 0) {
            setNameError("Name is required");
            status = false;
        } 
        // Check if username contains only alphabetic characters
        else if (!/^[a-zA-Z ]+$/.test(username)) {
            setNameError("Name must be alphabetic characters only");
            status = false;
        } 
        else {
            setNameError(null);
            setUsername(username);
            status = true;
        }
        return status;
    };

    // Handler for form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate form fields
        if (handleUsernameChange({ target: { value: username } }) && username && password && email) {
            // Send signup request to server
            axios.post(process.env.REACT_APP_USER_SIGN_UP, { email, password, username })
                .then(result => {
                    // Handle server response
                    if (result.data.message === 'User already exist') {
                        Swal.fire({
                            icon: "error",
                            title: "Account already exists",
                        });
                    } else {
                        // Save token in cookies and redirect to signin page
                        const token = result.data.token;
                        Cookies.set('token', token, { expires: 7, secure: true });
                        Swal.fire({
                            icon: "success",
                            title: "Account created successfully",
                        });
                        navigate("/signin");
                    }
                    // Clear form fields
                    setEmail("");
                    setPassword("");
                    setUsername("");
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
                    <form onSubmit={handleSubmit}>
                        <h3>Create Account Here</h3>
                        <label htmlFor="username">Username</label>
                        <input 
                            required 
                            onChange={handleUsernameChange} 
                            type="text" 
                            placeholder="Enter your username" 
                        />
                        {nameError && <div style={{ color: 'red' }}>{nameError}</div>}
                        <label htmlFor="email">Email</label>
                        <input 
                            required 
                            onChange={handleEmailChange} 
                            type="text" 
                            value={email} 
                            placeholder="Enter your email" 
                        />
                        {error && <div style={{ color: 'red' }}>{error}</div>}
                        <label htmlFor="password">Password</label>
                        <input 
                            required 
                            onChange={handlePasswordChange} 
                            type="password" 
                            value={password} 
                            placeholder="Enter your password" 
                        />
                        {passErr && <div style={{ color: 'red' }}>{passErr}</div>}
                        <button type="submit" className='mb-2'>Register</button>
                        <Link to="/signin">
                            <p>Already have an account? Sign in here</p>
                        </Link>
                    </form>
                </div>
                <div id="right-signup">
                    {/* This is the right section with the image */}
                </div>
            </div>
        </section>
    );
}

export default Signup;

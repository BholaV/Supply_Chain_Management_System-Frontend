import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/css/Signup.css'; // Import CSS for consistent styling across Signin and Signup
import Swal from 'sweetalert2';
import { useState } from 'react';
import Cookies from 'js-cookie';

function Signin() {
    // State variables to manage input values and error messages
    const [email, setEmail] = useState("");
    const [pass, setPassword] = useState("");
    const [error, setError] = useState(null);

    // Hook for programmatic navigation
    const navigate = useNavigate("");

    // Style object for the signin page layout
    const style = {
        backgroundColor: '#e3f2fd', // Light blue background
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
        // Validate email and set error message if invalid
        if (emailRegex.test(emailValue)) {
            setError(null);
        } else {
            setError('Invalid email address');
        }
    };

    // Handler for form submission
    const login = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const token = Cookies.get('token'); // Retrieve token from cookies
    
        try {
            // If token exists, attempt to login
            if (token) {
                const result = await axios.post(process.env.REACT_APP_USER_SIGN_IN, { email, password: pass, token });
                
                // Show success message and redirect on successful login
                Swal.fire({
                    icon: "success",
                    title: "Sign in successfully",
                });
    
                // Save user data in localStorage and navigate to the homepage
                localStorage.setItem("user", JSON.stringify(result.data.user));
                navigate("/");
                // Clear form fields after successful login
                setEmail("");
                setPassword("");
            } else {
                // If no token, request a new token from the server
                const result = await axios.post(process.env.REACT_APP_USER_GENERATE_TOKEN, { email });
                
                // Save new token in cookies and retry login with the new token
                Cookies.set("token", result.data.token);
                login(e); // Retry login with new token
            }
        } catch (err) {
            console.error(err);
    
            // Show error message on failed login
            Swal.fire({
                icon: "error",
                title: err.response?.data?.error || "An error occurred",
            });
        }
    };
    

    return (
        <section style={style}>
            <div id="form-container">
                <div id="right"></div> {/* Placeholder for an image or other content on the right side */}
                <div id="form" style={{ width: '350px' }}>
                    <form onSubmit={login}>
                        <h3>Login Here</h3>
                        <label htmlFor="email">Email</label>
                        <input 
                            required 
                            onChange={handleEmailChange} 
                            type="text" 
                            value={email} 
                            placeholder="Enter your email" 
                        />
                        {error && <div style={{ color: 'red' }}>{error}</div>}
                        <label htmlFor="password" className='mt-3'>Password</label>
                        <input 
                            required 
                            onChange={e => setPassword(e.target.value)} 
                            value={pass} 
                            type="password" 
                            placeholder="Password" 
                        />
                        <button type="submit" className='mt-3'>Log In</button>
                        <Link to="/signup">
                            <p className='mt-4'>Don't have an account?</p>
                        </Link>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Signin;

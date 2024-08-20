import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css'; // You can use the same CSS for both Signin and Signup
import Swal from 'sweetalert2';
import { useState } from 'react';

function Signin() {
    const [email, setEmail] = useState("");
    const [pass, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate("");

    const style = {
        backgroundColor: '#e3f2fd', // Light blue background
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

    const login = (e) => {
        e.preventDefault();
        
        axios.post("http://localhost:3001/user/Signin", { email, password: pass })
            .then(result => {
                Swal.fire({
                    icon: "success",
                    title: "Sign in successfully",
                });
                localStorage.setItem("user",JSON.stringify(result.data.user) );
                navigate("/");
                setEmail("");
                setPassword("");
            })
            .catch(err => {
                Swal.fire({
                    icon: "error",
                    title: "Something went wrong",
                });
            });
    };

    return (
        <section style={style}>
            <div id="form-container">
                <div id="right"></div> {/* Add image to the right side */}
                <div id="form" style={{ width: '350px' }}>
                    <form onSubmit={login}>
                        <h3>Login Here</h3>
                        <label htmlFor="email">Email</label>
                        <input required onChange={handleEmailChange} type="text" value={email} placeholder="Enter your email" />
                        {error && <div style={{ color: 'red' }}>{error}</div>}
                        <label htmlFor="password" className='mt-3'>Password</label>
                        <input required onChange={e => setPassword(e.target.value)} value={pass} type="password" placeholder="Password" />
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
import { Link } from 'react-router-dom';
import './Signup.css'
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';
function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setusername] = useState("");
    const [error, setError] = useState(null);
    const [passErr, setPassErr] = useState(null);
    const [checkErr,setCheckErr] = useState(null);
    const style = {
        backgroundImage: 'url("./Image/back.jpg")',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        height: '100vh'
    };

    const handleEmailChange = (event) => {
        const emailValue = event.target.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmail(event.target.value)
        if (emailRegex.test(emailValue)) {
            setError(null);
        } else {
            setError('Invalid email address');
        }
    };
    const handlePassword = (event) => {
        const passValue = event.target.value;
        setPassword(event.target.value)
        if (passValue.length <= 5) {
            setPassErr('Password length must more than 5');
        } else {
            setPassErr(null);
        }
    };

    const checkUserName = (event) => {
        const passValue = event.target.value;
        setusername(event.target.value)
        if (passValue.length != password.length && passValue===password) {
            setCheckErr('Password does not match');
            return false;
        } else {
            setCheckErr(null);
            return true;
        }
    };

    const Register = (e) => {
        e.preventDefault();
        if(checkUserName){
            axios.post("http://localhost:3001/user/SignUp", { email, password,username }).then(result => {
                Swal.fire({
                    icon: "success",
                    title: "Account created successfully..",
                    // text: "Something went wrong!",
                });
                setEmail("");
                setPassword("");
                setusername("");
            }).catch(err => {
                console.log(err);
                Swal.fire({
                    icon: "error",
                    title: "Something went wrong",
                    // text: "Something went wrong!",
                });
            })
        }
    }
    return <>
        <section style={style}>
            <div class="background">
                <div class="shape"></div>
                <div class="shape"></div>
            </div>
            <div id='form' class='d-flex' style={{ height: '600px' }}>

                <form onSubmit={Register}>
                    <h3>Create Account Here</h3>
                    <label for="password" className='mt-2'> Username</label>
                    <input required value={username} onChange={checkUserName} type="text" placeholder="username" />
                    <label className='mt-3' for="username" >Email</label>
                    <input required onChange={handleEmailChange} type="text" value={email} placeholder="Enter your email" id="username" />
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    <label for="password" className='mt-2'>Password</label>
                    <input required onChange={handlePassword} type="password" value={password} placeholder="Password" id="password" />
                    {passErr && <div style={{ color: 'red' }}>{passErr}</div>}
                    {checkErr && <div style={{ color: 'red' }}>{checkErr}</div>}
                    <button className='mt-3' type='submit'>Register</button>
                    <Link to="/signin">
                        <p className='m-2'>Already have account ?</p>
                    </Link>
                    <div class="social">
                        <div class="go"><i class="fab fa-google"></i> Google</div>
                        <div class="fb"><i class="fab fa-facebook"></i> Facebook</div>
                    </div>
                </form>
                <div id='right' style={{ marginLeft: '20px' }} >
                </div>
            </div>
        </section>
    </>
}

export default Signup;

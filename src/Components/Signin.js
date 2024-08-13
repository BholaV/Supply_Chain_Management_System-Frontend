import axios from 'axios';
import { Link } from 'react-router-dom';
import './Signup.css'
import Swal from 'sweetalert2';
import { useState } from 'react';

function Signin(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error, setError] = useState(null);

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
    
        setEmail(emailValue);
      };

    const login = (e)=>{
            e.preventDefault();
            let password = document.getElementById("validatePass").innerHTML = "";
            axios.post("http://localhost:3001/user/Signin",{email,password}).then(result=>{
            Swal.fire({
                icon: "success",
                title: "Sign in successfully..",
                // text: "Something went wrong!",
            });
        }).catch(err=>{
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "Something went wrong",
                // text: "Something went wrong!",
            });
        })
    }
    return<>
       <section style={style}>
            <div class="background">
                <div class="shape"></div>
                <div class="shape"></div>
            </div>
            <div id='form' class='d-flex'>
                <div id='right'  >
                </div>

                <form onSubmit={login}>
                    <h3>Login Here</h3>

                    <label for="username" >Username</label>
                    <input required onChange={handleEmailChange} type="text" placeholder="Enter your email" id="username" />
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    <label for="password" className='mt-2'>Password</label>
                    <input required onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" id="password" />
                    <span id='validatePass'></span>
                    <button type='submit'>Log In</button>
                    <Link to="/">
                    <p className='m-2'>Do not have account ?</p>
                    </Link>
                    <div class="social">
                        <div class="go"><i class="fab fa-google"></i> Google</div>
                        <div class="fb"><i class="fab fa-facebook"></i> Facebook</div>
                    </div>
                </form>
            </div>
        </section>
    </>
}

export default Signin;
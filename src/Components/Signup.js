import { Link } from 'react-router-dom';
import './Signup.css'
import axios from 'axios';
import { useState } from 'react';
function Signup() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [ confirmPass,setConfirmPass] = useState("");
    const style = {
        backgroundImage: 'url("./Image/back.jpg")',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        height: '100vh'
    };

    const Register = (e)=>{
        e.preventDefault();
        axios.post("http://localhost:3001/user/SignUp",{email,password}).then(result=>{
            alert("Sign up successfully...")
        }).then(err=>{
            console.log(err);
        })
    }
    return <>
        <section style={style}>
            <div class="background">
                <div class="shape"></div>
                <div class="shape"></div>
            </div>
            <div id='form' class='d-flex' style={{height:'600px'}}>

                <form>
                    <h3>Create Account Here</h3>

                    <label for="username" >Username</label>
                    <input onChange={e=>setEmail(e.target.value)} type="text" placeholder="Email or Phone" id="username" />

                    <label for="password" className='mt-2'>Password</label>
                    <input onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" id="password" />
                    
                    <label for="password" className='mt-2'> Confirm Password</label>
                    <input onChange={e=>setConfirmPass(e.target.value)} type="password" placeholder="Confirm Password"  />
                    <button className='mt-3' onClick={Register}>Register</button>
                    <Link to="/signin">
                    <p className='m-2'>Already have account ?</p>
                    </Link>
                    <div class="social">
                        <div class="go"><i class="fab fa-google"></i> Google</div>
                        <div class="fb"><i class="fab fa-facebook"></i> Facebook</div>
                    </div>
                </form>
                <div id='right' style={{marginLeft:'20px'}} >
                </div>
            </div>
        </section>
    </>
}

export default Signup;

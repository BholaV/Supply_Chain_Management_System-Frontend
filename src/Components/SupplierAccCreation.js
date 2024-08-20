import { BiCategory } from "react-icons/bi";
import { FaPhoneAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import backImg from './back.jpg'
import './SupplierAccCreation.css'
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
export default function SupplierAccCreation() {

    const style = {
        // backgroundImage: 'url("./Image/back.jpg")',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        height: '83vh',
        zIndex: '10'
    };
    const [contact, setContact] = useState("");
    const [category, setCategory] = useState("");
    const [username, setusername] = useState("");
    const [error, setError] = useState(null);
    const [categoryError, setCategoryErr] = useState(null);
    const [checkErr, setCheckErr] = useState(null);

    const handleContact = (event) => {
        const contactValue = event.target.value;
        const contactRegex = /^\d{10}$/;
        setContact(event.target.value)
        if (contactRegex.test(contactValue)) {
            setError("");
        } else {
            setError('Invalid contact number');
        }
    };

    const handleCategory = (event) => {
        const categoryValue = event.target.value;
        setCategory(event.target.value)
        if (categoryValue.length < 3) {
            setCategoryErr('Invalid category!');
        } else {
            setCategoryErr("");
        }
    };

    const checkUserName = (e) => {
        const username = e.target.value.trim();
        const nameError = document.getElementById("name");
        let status = true;

        if (username.length === 0) {
            status = false;
            nameError.innerHTML = "Name is required";
            nameError.style.color = 'red';
        } else if (!/^[a-zA-Z ]+$/.test(username)) {
            status = false;
            nameError.innerHTML = "Name must be characters and spaces only";
            nameError.style.color = 'red';
        } else {
            nameError.innerHTML = "";
            setusername(username);
            status = true;
        }

        return status;
    }


    const register = (e) => {
        e.preventDefault();
        if (checkUserName && username && category && contact) {
            axios.post("http://localhost:3001/supplier/addSupplier", { contact, productCategory: category, name: username }).then(result => {
                console.log(result)
                console.log(result.data.message)
                if (result.data.message == 'User already exist') {
                    Swal.fire({
                        icon: "error",
                        title: "Account is already exist..",
                        // text: "Something went wrong!",
                    });
                } else {

                    Swal.fire({
                        icon: "success",
                        title: "Account created successfully..",
                    });
                    setContact("");
                    setCategory("");
                    setusername("");
                    e.target.reset();
                }
            }).catch(err => {
                console.log(err);
                Swal.fire({
                    icon: "error",
                    title: "Something went wrong",
                    // text: "Something went wrong!",
                });
            })
        } else {

        }
    }
    return <>
        <section id="supply-bg" className='d-flex justify-content-center align-items-center bg-grey flex-column p-5' style={style}>
            <form class="form" onSubmit={register}>
                <h2 className='text-dark m-1'>Supplier Account Form</h2>
                <div class="flex-column m-0">
                    <label className="text-dark mt-3">Name </label>
                </div>
                <div class="inputForm">
                    <FaUser className="fs-4" />
                    <input type="text" defaultValue={username} required onChange={checkUserName} class="input" placeholder="Enter your Name" />
                </div>
                <span id='name'></span>
                <div class="flex-column">
                    <label className="text-dark mt-3">Contact </label>
                </div>
                <div class="inputForm">
                    <FaPhoneAlt className="fs-4" />
                    <input type="text" defaultValue={contact} required onChange={handleContact} class="input" placeholder="Enter phone" />
                </div>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <div class="flex-column">
                    <label className="text-dark mt-3">Product Category </label>
                </div>
                <div class="inputForm">
                    <BiCategory className="fs-4" />
                    <input type="text" defaultValue={category} required onChange={handleCategory} class="input" placeholder="Enter product category" />
                </div>
                {categoryError && <div style={{ color: 'red' }}>{categoryError}</div>}
                <center>
                    <button class="button-submit w-75">Create Account</button>
                </center>
                {/* <p class="p">Already have a account? <span class="span">login</span></p> */}
                <div class="flex-row">
                </div>
            </form>
        </section>
    </>
}
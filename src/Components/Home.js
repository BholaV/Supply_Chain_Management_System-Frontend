import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Home() {
    const style = {
        // backgroundImage: 'url("./Image/back.jpg")',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        height: 'auto'
    };
    const [productLength, setProductLength] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3001/product/fetchLowStockProducts").then(result => {
            setProductLength(result.data.length);
        }).catch(err => {
            console.log(err);
        });
    }, [])
    console.log(productLength)
    const navigate = useNavigate();
    const addSupplier=()=>{
        document.getElementById("view-supplier").style.backgroundColor = 'white';
        document.getElementById("product-inventry").style.backgroundColor = 'white';
        document.getElementById("notification").style.backgroundColor='white';
        document.getElementById("order").style.backgroundColor='white';
        const supplier = document.getElementById("add-supplier");
        supplier.style.backgroundColor = 'grey'
        navigate('addsupplier');
    }
    const viewSupplier=()=>{
        document.getElementById("add-supplier").style.backgroundColor = 'white';
        document.getElementById("product-inventry").style.backgroundColor = 'white';
        document.getElementById("notification").style.backgroundColor='white';
        document.getElementById("order").style.backgroundColor='white';
        const supplier = document.getElementById("view-supplier");
        supplier.style.backgroundColor = 'grey'
        navigate('');
    }
    const viewProduct=()=>{
        document.getElementById("add-supplier").style.backgroundColor = 'white';
        document.getElementById("view-supplier").style.backgroundColor='white';
        document.getElementById("order").style.backgroundColor='white';
        document.getElementById("notification").style.backgroundColor='white';
        const supplier = document.getElementById("product-inventry")
        supplier.style.backgroundColor = 'grey'
        navigate('product');
    }
    const viewStockLevel=()=>{
        document.getElementById("add-supplier").style.backgroundColor = 'white';
        document.getElementById("view-supplier").style.backgroundColor='white';
        document.getElementById("order").style.backgroundColor='white';
        document.getElementById("product-inventry").style.backgroundColor='white';
        const supplier = document.getElementById("notification")
        supplier.style.backgroundColor = 'grey'
        navigate('notification');
    }
    const viewOrder=()=>{
        document.getElementById("add-supplier").style.backgroundColor = 'white';
        document.getElementById("view-supplier").style.backgroundColor='white';
        document.getElementById("product-inventry").style.backgroundColor='white';
        document.getElementById("notification").style.backgroundColor='white';
        const supplier = document.getElementById("order")
        supplier.style.backgroundColor = 'grey'
        navigate('myOrder');
    }
    return <>
        <header style={{position:'relative'}}>
            <div style={{position:'sticky',top:'0',zIndex:'2'}}>
                <h1 className="container-fluid bg-dark text-white p-3 m-0"> Supply Chain Management System</h1>
                <div className="container-fluid d-flex bg-white justify-content-center align-items-around">
                    <span onClick={addSupplier} className="btn m-2" id="add-supplier" >Add Supplier</span>
                    <span className="btn m-2" style={{backgroundColor:'grey'}} onClick={viewSupplier} id="view-supplier">View All Supplier</span>
                    <span className="btn m-2" id="product-inventry" onClick={viewProduct}>Product inventry</span>
                    <span className="btn m-2" id="notification" onClick={viewStockLevel}>Notification <span className="text-danger">({productLength})</span></span>
                    <span className="btn m-2" id="order" onClick={viewOrder}>Order </span>

                </div>
            </div>
            <section style={style}>
                <Outlet />
            </section>
            {/* <h4 className="container-fluid bg-dark text-white p-3 mt-1"> Supply Chain Management System for inventry</h4> */}

        </header>
    </>
}

export default Home;
import { Link, Outlet, useNavigate } from "react-router-dom";

function Home() {
    const style = {
        backgroundImage: 'url("./Image/back.jpg")',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        height: 'auto'
    };
    const navigate = useNavigate();
    const addSupplier=()=>{
        document.getElementById("view-supplier").style.backgroundColor = 'white';
        document.getElementById("product-inventry").style.backgroundColor = 'white';
        const supplier = document.getElementById("add-supplier");
        supplier.style.backgroundColor = 'grey'
        navigate('addsupplier');
    }
    const viewSupplier=()=>{
        document.getElementById("add-supplier").style.backgroundColor = 'white';
        document.getElementById("product-inventry").style.backgroundColor = 'white';
        const supplier = document.getElementById("view-supplier");
        supplier.style.backgroundColor = 'grey'
        navigate('');
    }
    const viewProduct=()=>{
        document.getElementById("add-supplier").style.backgroundColor = 'white';
        document.getElementById("view-supplier").style.backgroundColor='white';
        const supplier = document.getElementById("product-inventry")
        supplier.style.backgroundColor = 'grey'
        navigate('product');
    }
    return <>
        <header style={{position:'relative'}}>
            <div style={{position:'sticky',top:'0',zIndex:'2'}}>
                <h1 className="container-fluid bg-dark text-white p-3 m-0"> Supply Chain Management System</h1>
                <div className="container-fluid d-flex bg-white justify-content-center align-items-around">
                    <span onClick={addSupplier} className="btn m-2" id="add-supplier" >Add Supplier</span>
                    <span className="btn m-2" style={{backgroundColor:'grey'}} onClick={viewSupplier} id="view-supplier">View All Supplier</span>
                    <span className="btn m-2" id="product-inventry" onClick={viewProduct}>Product inventry</span>
                    <span className="btn m-2" id="notification">Notification</span>
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
import { Link, Outlet, useNavigate } from "react-router-dom";

function Home() {
    const style = {
        backgroundImage: 'url("./Image/back.jpg")',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        height: '80vh'
    };
    const navigate = useNavigate();
    return <>
        <header style={{position:'relative'}}>
            <div style={{position:'sticky',top:'0',zIndex:'2'}}>
                <h1 className="container-fluid bg-dark text-white p-3 m-0"> Supply Chain Management System</h1>
                <div className="container-fluid d-flex bg-white justify-content-center align-items-around">
                    <span onClick={() => navigate("addSupplier")} className="btn m-2" >Add Supplier</span>
                    <span className="btn m-2" onClick={() => navigate("")} >View All Supplier</span>
                    <span className="btn m-2" >Product inventry</span>
                    <span className="btn m-2" >Notification</span>
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
import Swal from 'sweetalert2';
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import '../assets/css/home.css';

function Home() {
    // Inline style for the header's background
    const style = {
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        height: 'auto'
    };
    
    // State to keep track of the number of low-stock products
    const [productLength, setProductLength] = useState([]);
    
    // State to track the active button to highlight it
    const [activeButton, setActiveButton] = useState('view-supplier'); // Default active button
    const navigate = useNavigate();

    // Fetch the number of low-stock products on component mount
    useEffect(() => {
        axios.get(process.env.REACT_APP_PRODUCT_FETCH_LOW_STOCK)
            .then(result => {
                setProductLength(result.data.length);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    // Function to handle button clicks and navigation
    const handleButtonClick = (buttonId, route) => {
        setActiveButton(buttonId); // Set the clicked button as active
        navigate(route); // Navigate to the corresponding route
    };

    // Function to handle logout process
    const logout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to logout?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, logout',
            cancelButtonText: 'No, Stay here'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Logout successfully', 'Login again.', 'success');
                localStorage.clear(); // Clear local storage on logout
                navigate("/signin"); // Navigate to the sign-in page
            } else {
                Swal.fire('Error', 'Failed to logout.', 'error');
            }
        });
    };

    return (
        <header style={{ position: 'relative' }}>
            {/* Header section */}
            <div style={{ position: 'sticky', top: '0', zIndex: '2' }}>
                <div className="container-fluid bg-dark text-white w-100 p-3 m-0 position-relative">
                    <h1 className="d-inline">Supply Chain Management System</h1>
                </div>
                {/* Navigation bar with buttons */}
                <div className="container-fluid d-flex bg-white flex-nowrap justify-content-center align-items-around">
                    {/* Button to add a new supplier */}
                    <span
                        onClick={() => handleButtonClick('add-supplier', 'addsupplier')}
                        className={`btn m-2 ${activeButton === 'add-supplier' ? 'bg-grey' : ''}`}
                        id="add-supplier"
                    >
                        Add Supplier
                    </span>
                    {/* Button to view all suppliers */}
                    <span
                        onClick={() => handleButtonClick('view-supplier', '')}
                        className={`btn m-2 ${activeButton === 'view-supplier' ? 'bg-grey' : ''}`}
                        id="view-supplier"
                    >
                        View All Supplier
                    </span>
                    {/* Button to view product inventory */}
                    <span
                        onClick={() => handleButtonClick('product-inventry', 'product')}
                        className={`btn m-2 ${activeButton === 'product-inventry' ? 'bg-grey' : ''}`}
                        id="product-inventry"
                    >
                        Product Inventory
                    </span>
                    {/* Button to view notifications with low-stock count */}
                    <span
                        onClick={() => handleButtonClick('notification', 'notification')}
                        className={`btn m-2 ${activeButton === 'notification' ? 'bg-grey' : ''}`}
                        id="notification"
                    >
                        Notification <span className="text-danger">({productLength})</span>
                    </span>
                    {/* Button to view orders */}
                    <span
                        onClick={() => handleButtonClick('order', 'myOrder')}
                        className={`btn m-2 ${activeButton === 'order' ? 'bg-grey' : ''}`}
                        id="order"
                    >
                        Order
                    </span>
                    {/* Button to logout */}
                    <span className="btn m-2" id="logout" onClick={logout}>
                        Logout
                    </span>
                </div>
            </div>
            {/* Outlet to render nested routes */}
            <section style={style}>
                <Outlet />
            </section>
        </header>
    );
}

export default Home;

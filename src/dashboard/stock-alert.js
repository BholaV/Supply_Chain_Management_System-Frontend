import axios from "axios";
import { useEffect, useState } from "react";
import { MdCurrencyRupee } from "react-icons/md";

export default function StockAlert() {
    // State to hold the list of products
    const [products, setProducts] = useState([]);

    // Fetch low stock products when the component mounts
    useEffect(() => {
        // Fetch data from the API
        axios.get(process.env.REACT_APP_PRODUCT_FETCH_LOW_STOCK)
            .then(result => {
                // Update state with the fetched products
                setProducts(result.data);
            })
            .catch(err => {
                // Log any errors that occur during the fetch
                console.log(err);
            });
    }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <div className="container border p-2">
            <h3>Stock Level</h3>
            <table className="table border">
                <thead>
                    <tr>
                        <th><h5>Sr. No.</h5></th>
                        <th style={{ textAlign: 'left' }}><h5>Product Name</h5></th>
                        <th><h5>Thumbnail</h5></th>
                        <th><h5>Price (<MdCurrencyRupee />)</h5></th>
                        <th><h5>Quantity</h5></th>
                    </tr>
                </thead>
                <tbody>
                    {/* Render each product in a table row */}
                    {products.map((item, index) => (
                        <tr key={index}>
                            <td><h5>{index + 1}</h5></td>
                            <td style={{ textAlign: 'left' }}><h5>{item.title.slice(0, 30)}</h5></td>
                            <td>
                                <img 
                                    src={item.thumbnail} 
                                    alt="Thumbnail" 
                                    style={{ width: '70px', height: '50px' }} 
                                />
                            </td>
                            <td><h5>{(item.price * 10).toFixed(2)}</h5></td>
                            <td style={{ color: 'red' }}><h5>{item.stock}</h5></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

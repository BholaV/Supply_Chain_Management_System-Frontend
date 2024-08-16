import axios from "axios";
import { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";

import './productInventry.css'
function ProductInventry() {
    const [product, setProduct] = useState([]);
    useEffect(() => {
        axios.get("https://dummyjson.com/products").then(result => {
            console.log(result.data.products);
            setProduct(result.data.products);
        }).catch(err => {
            console.log(err);
        });
    }, [])


    return <>
        {/* <h1>Product Inventory</h1> */}
        <section id="product-inventry-parent" >
            { product?.map((data, index) => <div id="product-invt"  key={index} >
                <img src={data.thumbnail} width="250px" height="250px"/>
                <h4 className="text-white m-0">{data.title.slice(0,15)}</h4>
                <span>{data.discountPercentage}% Off</span>
                <p className="text-white m-0">Category : <b className="text-dark">{data.category}</b></p>
                <h6 id="price" style={{display:'inline'}} >Price: <b>{(data.price*10).toFixed(2)}</b>  <FaRupeeSign/></h6>
               <center>
                <button className="m-1 btn btn-outline-primary center w-50">Order   </button>
                </center> 
            </div>)} 

        </section>
    </>
}

export default ProductInventry;
import axios from "axios";
import { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";

import './productInventry.css'
import Swal from "sweetalert2";
function ProductInventry() {
    const [product, setProduct] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3001/product/viewAllProduct").then(result => {
            // console.log(result.data.result);
            setProduct(result.data.result);
        }).catch(err => {
            console.log(err);
        });
    }, [])

    const changeImg = (productImg, index) => {
        const thumbnail = document.getElementById(`thumbnail-${index}`);
        thumbnail.src = productImg;
    }

    const createOrder = (product) => {
        let user = localStorage.getItem("user");
        user = JSON.parse(user);
        const userId = user._id;
        const productId = product._id
      
        Swal.fire({
          title: 'Are you sure?',
          text: `Do you want to create an order for ${product.title}?`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes, create order',
          cancelButtonText: 'No, cancel'
        }).then((result) => {
          if (result.value) {
            axios.post("http://localhost:3001/order/createOrder",{userId,productId})
              .then(result => {
                console.log(result.data);
                axios.delete(`http://localhost:3001/product/removeStock/${productId}`).then(res=>{
                  Swal.fire({
                    title: 'Order created!',
                    text: 'Your order has been created successfully',
                    icon: 'success'
                  })
                }).catch(err=>{
                  console.log(err);
                  Swal.fire({
                    title: 'Oops!',
                    text: err.response.data.message,
                    icon: 'error'
                  })
                });
              })
              .catch(err => {
                console.log(err);
                Swal.fire({
                  title: 'Error!',
                  text: 'There was an error creating your order',
                  icon: 'error'
                })
              });
          }
        })
      }
      
    return <>
        {/* <h1>Product Inventory</h1> */}
        <section id="product-inventry-parent" >
            {product?.map((data, index) => <div id="product-invt" key={index} >
                <img src={data.thumbnail} width="250px" height="250px" id={`thumbnail-${index}`} />
                <div className="d-flex w-100 justify-content-center p-2">{data.images?.map((product, ind) =>
                    <div key={ind} className="border ms-4" style={{ cursor: 'pointer' }} onClick={() => changeImg(product, index)}><img src={product} alt="image" style={{ width: '50px', height: '50px' }} /></div>
                )}
                </div>
                <h4 >{data.title.slice(0, 15)}</h4>
                <p className="text-white fw-bold fs-5 m-1">Category : <b className="text-dark">{data.categoryName}</b></p>
                <h6 id="price" style={{ display: 'inline' }} >Price: <b>{(data.price * 10).toFixed(2)}</b>  <FaRupeeSign /></h6>&nbsp;&nbsp;&nbsp;
                <span>{data.discountPercentage}% Off</span>
                <center>
                    <button className="m-1 btn btn-outline-primary center w-50" onClick={() => createOrder(data)}>Order   </button>
                </center>
            </div>)}

        </section>
    </>
}

export default ProductInventry;
import axios from "axios";
import { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import '../assets/css/product-inventory.css';
import { useDispatch, useSelector } from "react-redux"

import Swal from "sweetalert2";
import store from "../redux/store";
import { fetchProducts } from "../redux/slice";

function ProductInventry() {
  // State to store the list of products
  const [product, setProduct] = useState([]);
  const dispatch = useDispatch();
  //getting product data by using redux-toolkit
  const { productList,loading } = useSelector(store => store.Product)
  // Fetch all products when the component mounts

  // useEffect(() => {
  // axios.get(process.env.REACT_APP_PRODUCT_VIEW_ALL)
  //   .then(result => {
  //     // Set products data from API response
  //     setProduct(result.data.result);
  //   })
  //   .catch(err => {
  //     // Log any errors during the fetch
  //     console.log(err);
  //   });
  // }, []);

  useEffect(() => {
    dispatch(fetchProducts());
    setProduct(productList);
  }, [])


  // Function to change the main product image when a thumbnail is clicked
  const changeImg = (productImg, index) => {
    const thumbnail = document.getElementById(`thumbnail-${index}`);
    thumbnail.src = productImg;
  }

  // Function to handle order creation
  const createOrder = (product) => {
    let user = localStorage.getItem("user");
    user = JSON.parse(user); // Parse the user data from localStorage
    const userId = user._id; // Get user ID from parsed data
    const productId = product._id; // Get product ID

    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to create an order for ${product.title}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, create order',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // First, check the stock availability
        axios.get(`${process.env.REACT_APP_PRODUCT_CHECK_STOCK}/${productId}`)
          .then(response => {
            const { stockAvailable } = response.data;

            if (stockAvailable) {
              // If stock is available, create the order
              axios.post(process.env.REACT_APP_ORDER_CREATE, { userId, productId })
                .then(orderResult => {
                  console.log(orderResult.data);

                  // Remove stock after the order is created
                  axios.delete(`${process.env.REACT_APP_PRODUCT_REMOVE_STOCK}/${productId}`)
                    .then(res => {
                      Swal.fire({
                        title: 'Order created!',
                        text: 'Your order has been created successfully',
                        icon: 'success'
                      });
                    })
                    .catch(err => {
                      console.log(err);
                      Swal.fire({
                        title: 'Oops!',
                        text: err.response?.data?.message || 'An error occurred',
                        icon: 'error'
                      });
                    });
                })
                .catch(err => {
                  console.log(err);
                  Swal.fire({
                    title: 'Error!',
                    text: 'There was an error creating your order',
                    icon: 'error'
                  });
                });
            } else {
              // Notify the user if the product is out of stock
              Swal.fire({
                title: 'Out of Stock!',
                text: 'Sorry, this product is out of stock.',
                icon: 'error'
              });
            }
          })
          .catch(err => {
            console.log(err);
            Swal.fire({
              title: 'Error!',
              text: 'There was an error checking the stock',
              icon: 'error'
            });
          });
      }
    });
  };

  return (
    <>
      {/* Main section for displaying products */}
      {!loading?(
      <section id="product-inventry-parent">
        {product?.map((data, index) => (
          <div id="product-invt" key={index}>
            {/* Main product image */}
            <img src={data.thumbnail} width="250px" height="250px" id={`thumbnail-${index}`} />

            {/* Thumbnails for changing the main product image */}
            <div className="d-flex w-100 justify-content-center p-2">
              {data.images?.map((productImg, ind) =>
                <div key={ind} className="border ms-4" style={{ cursor: 'pointer' }} onClick={() => changeImg(productImg, index)}>
                  <img src={productImg} alt="image" style={{ width: '50px', height: '50px' }} />
                </div>
              )}
            </div>

            {/* Product title */}
            <h4>{data.title?.slice(0, 15)}</h4>
            {/* Product category */}
            <p className="text-white fw-bold fs-5 m-1">
              Category : <b className="text-dark">{data.categoryName}</b>
            </p>
            {/* Product price and discount */}
            <h6 id="price" style={{ display: 'inline' }}>
              Price: <b>{(data.price * 10).toFixed(2)}</b> <FaRupeeSign />
            </h6>&nbsp;&nbsp;&nbsp;
            <span>{data.discountPercentage}% Off</span>

            {/* Button to create an order */}
            <center>
              <button className="m-1 btn btn-outline-primary center w-50" onClick={() => createOrder(data)}>Order</button>
            </center>
          </div>
        ))}
      </section>
      ):(<div>
        <h1>Loading...</h1>
      </div>)}
    </>
  );
}

export default ProductInventry;

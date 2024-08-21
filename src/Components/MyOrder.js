import { useEffect, useState } from 'react'
import './MyOrder.css'
import { MdDelete } from "react-icons/md";
import axios from 'axios'
import { FaRegEdit } from "react-icons/fa";

import { FaStar } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";
import Swal from 'sweetalert2';
export default function MyOrder() {
  const [isEditing, setIsEditing] = useState(false);
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  const userId = user._id;
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    status: '',
    productId:'',
    orderId:''
  });
  useEffect(() => {
    axios.get(`http://localhost:3001/Order/viewOrder/${userId}`).then(result => {
      console.log(result.data);
      setOrders(result.data)
    }).catch(err => {
      console.log(err);
    });
  }, [])
  const changeImg = (productImg, index) => {
    const thumbnail = document.getElementById(`thumbnail-${index}`);
    thumbnail.src = productImg;
  }
  const editOrder = (data) => {
    // setOrders(data);
    setFormData({
      status: data.status,
      title: data.productId.title,
      orderId:data._id
    });
    setIsEditing(true);
  }
  const removeOrder = (order, index) => {
    const orderId = order._id;
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3001/Order/removeOrder/${orderId}`)
          .then(response => {
            const newProduct = [...orders];
            newProduct.splice(index, 1);
            setOrders(newProduct);
            Swal.fire('Deleted!', 'Your record has been deleted.', 'success');
          })
          .catch(error => {
            console.log(error)
            Swal.fire('Error', 'Failed to delete record.', 'error');
          });
      }
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const status = formData.status;
    const orderId = formData.orderId;
    axios.put(`http://localhost:3001/Order/updateOrder/${orderId}`, {status}).then(result => {
      console.log(result)
      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Supplier details have been updated successfully.',
        confirmButtonColor: '#3085d6',
      });
      setIsEditing(false);
      setFormData({});
      e.target.reset();
      // Update the state or props of the component
      setOrders(prevOrders => prevOrders.map(order => {
        if (order.id === orderId) {
          return { ...order, status };
        }
        return order;
      }));
    }).catch(err => {
      console.log(err)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong while updating the Order Status. Please try again.',
        confirmButtonColor: '#d33',
      });
      setIsEditing(false);
    });
  }
  return <>
    {/* <h2 className='container p-3'>Order Details</h2> */}
    <section >
      <div className="container p-3">
        {orders?.map((data, index) => <section className='border p-2 mt-4'>
          <h2>Order {index + 1}</h2>
          <div className='d-flex' id='myOrder-child-div' key={index}>
            <div className='border m-1 d-flex'>
              <div className='d-flex flex-column align-items-center justify-content-center'>
                {data.productId.images.map((proImg, ind) => <div className='border m-2 p-1' key={ind} style={{ width: '70px', height: '70px', cursor: 'pointer' }} onClick={() => changeImg(proImg, index)}>
                  <img style={{ width: '50px', height: '50px' }} src={proImg} alt='no image found' />
                </div>
                )}
              </div>
              <div>
                <img src={data.productId.thumbnail} style={{ maxWidth: '300px', maxHeight: '300px' }} alt='no image found' id={`thumbnail-${index}`} />
              </div>
            </div>
            <div className='border m-1 text-left position-relative p-2' style={{ textAlign: 'left' }}>
              <h3>{data.productId.title} </h3>

              <FaRegEdit className='text-primary' style={{ position: 'absolute', top: '4', right: '50', fontSize: '39px', cursor: 'pointer' }} onClick={() => editOrder(data, index)} />
              <MdDelete className='text-danger' style={{ position: 'absolute', top: '4', right: '4', fontSize: '39px', cursor: 'pointer' }} onClick={() => removeOrder(data, index)} />
              <h4>Category: <span className='fw-normal'>{data.productId.categoryName}</span></h4>
              <h2> <MdCurrencyRupee />  {((data.productId.price) * 10 - (10 * (parseInt(data.productId.price) * parseInt(data.productId.discountPercentage)) / 100)).toFixed(2)} <span className='text-secondary'><del>{(data.productId.price * 10).toFixed(2)}</del></span> <span className='text-success fs-3'> {data.productId.discountPercentage}% off</span></h2>
              <p style={{ fontSize: '18px' }}>Description: {data.productId.description}</p>
              <span className='bg-success text-light p-1'>{data.productId.rating} <FaStar className='mb-1' /></span>
            </div>
          </div>
          <section id='myOrder' className='container'>
            <div className='col-md-12'>
              <div className="card m-1 p-0">
                <div className="d-flex flex-column justify-content-around align-content-around ms-auto" style={{ width: '97%' }}>
                  <div className="row d-flex justify-content-center">
                    <div className="col-12" id='myOrder-child'>
                      {data.status === "Cancelled" ? (
                        <ul id="progressbar" className="text-center">
                          <li style={{ width: '50%' }} className="active step0"></li>
                          <li style={{ width: '50%' }} className={`step0 ${data.status === 'Cancelled' ? 'active' : ''}`}></li>
                        </ul>
                      ) : (
                        <ul id="progressbar" className="text-center">
                          <li className="active step0"></li>
                          <li className={`step0 ${data.status === 'Order Shipped' || data.status === 'Out for delivery' || data.status === 'Delivered' ? 'active' : ''}`}></li>
                          <li className={`step0 ${data.status === 'Out for delivery' || data.status === 'Delivered' ? 'active' : ''}`}></li>
                          <li className={`step0 ${data.status === 'Delivered' ? 'active' : ''}`}></li>
                        </ul>
                      )}
                    </div>
                  </div>
                  {data.status === "Cancelled" ? (
                    <div className="d-flex justify-content-around">
                      <div className="d-flex align-items-start icon-content ms-3" id='img-content'>
                        <img className="icon" src="https://i.imgur.com/9nnc9Et.png" />
                        <div className="ms-2">
                          <p className="font-weight-bold">Order<br />Confirmed</p>
                        </div>
                      </div>
                      <div className="d-flex icon-content" id='img-content'>
                        <img className="icon" src="https://i.imgur.com/HdsziHP.png" />
                        <div className="ms-2">
                          <p className="font-weight-bold">Order<br />Cancelled</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-around">
                      <div className="d-flex icon-content ms-3" id='img-content'>
                        <img className="icon" src="https://i.imgur.com/9nnc9Et.png" />
                        <div className="ms-2">
                          <p className="font-weight-bold">Order<br />Confirmed</p>
                        </div>
                      </div>
                      <div className="d-flex icon-content" id='img-content'>
                        <img className="icon" src="https://i.imgur.com/u1AzR7w.png" />
                        <div className="ms-2">
                          <p className="font-weight-bold">Order<br />Shipped</p>
                        </div>
                      </div>
                      <div className="d-flex icon-content" id='img-content'>
                        <img className="icon" src="https://i.imgur.com/TkPm63y.png" />
                        <div className="ms-2">
                          <p className="font-weight-bold">On<br />the way</p>
                        </div>
                      </div>
                      <div className="d-flex icon-content" id='img-content'>
                        <img className="icon" src="https://i.imgur.com/HdsziHP.png" />
                        <div className="ms-2">
                          <p className="font-weight-bold">Order<br />Arrived</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </section>
        )}

      </div>

    </section>
    {isEditing && (
      <section className="w-100 h-100 d-flex justify-content-center align-content-between bg-info">
        <div className="edit-form-container mt-4">
          <h2>Update Detail</h2>
          <form onSubmit={handleSubmit}>
            <label className="text-dark">
              Product Name:
              <input id="input-feild"
                type="text"
                name="contact"
                value={formData.title}
              />
            </label>
            <label className="text-dark">
              Order Status:
              <input id="input-feild"
                type="text"
                name="productCategory"
                value={formData.status}
              />
              <label className="text-dark">
                Order Status:<br />
                <select defaultValue={formData.status} id="input input-feild" className='form-control mt-1' onChange={(e) => setFormData({...formData, status: e.target.value })}>
                  <option value="Order Confirmed">Order Confirmed</option>
                  <option value="Order Shipped">Order Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </label>
            </label>
            <div className="d-flex">
              <button type="button" className="btn btn-outline-danger border m-1" onClick={() => setIsEditing(false)}>Cancel</button>
              <button type="submit" className="btn m-1 bg-primary" >Save</button>
            </div>
          </form>
        </div>
      </section>
    )}
  </>
}
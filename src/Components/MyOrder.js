import { useEffect, useState } from 'react'
import './MyOrder.css'
import axios from 'axios'
import { FaStar } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";
export default function MyOrder() {

  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  const userId = user._id;
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.post(`http://localhost:3001/Order/viewOrder/${userId}`).then(result => {
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
  return <>
    {/* <h2 className='container p-3'>Order Details</h2> */}
    <section >
      <div className="container border p-3">
        {orders?.map((data, index) => <section>
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
            <div className='border m-1 text-left p-2' style={{ textAlign: 'left' }}>
              <h3>{data.productId.title} </h3>
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
  </>
}
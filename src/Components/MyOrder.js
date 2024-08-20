import { useEffect, useState } from 'react'
import './MyOrder.css'
import axios from 'axios'

export default function MyOrder() {
  const status = "Delivered";
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  const userId = user._id;
  const [orders,setOrders] = useState([]);
  useEffect(()=>{
    axios.post(`http://localhost:3001/Order/viewOrder/${userId}`).then(result=>{
        console.log(result);
        setOrders(result.data)
    }).catch(err=>{
        console.log(err);
    });
  },[])
  return <>
  {/* <h2 className='container p-3'>Order Details</h2> */}
  <div className="container p-3">
    {orders?.map((data,index)=><div className='text-align-left' key={index}>
        <img src={data.productId.thumbnail} alt='no image found'/>
        <h3>Product Name:{data.productId.title}</h3>
        <h2>Product Category: <span className='fw-normal'>{data.productId.categoryName}</span></h2>
        <h2>Price: {(data.productId.price*10).toFixed(2)}</h2>
        <p>Description: {data.productId.description}</p>
        </div>)}
  </div>
    <section id='myOrder'>
      <div className='col-md-10'>
        <div className="card m-1 p-0">
          <div className="d-flex flex-column justify-content-around align-content-around ms-auto" style={{ width: '97%' }}>
            <div className="row d-flex justify-content-center">
              <div className="col-12" id='myOrder-child'>
                {status === "Cancelled" ? (
                  <ul id="progressbar" className="text-center">
                    <li style={{ width: '50%' }} className="active step0"></li>
                    <li style={{ width: '50%' }} className={`step0 ${status === 'Cancelled' ? 'active' : ''}`}></li>
                  </ul>
                ) : (
                    <ul id="progressbar" className="text-center">
                    <li className="active step0"></li>
                    <li className={`step0 ${status === 'Order Shipped' || status === 'Out for delivery' || status === 'Delivered' ? 'active' : ''}`}></li>
                    <li className={`step0 ${status === 'Out for delivery' || status === 'Delivered' ? 'active' : ''}`}></li>
                    <li className={`step0 ${status === 'Delivered' ? 'active' : ''}`}></li>
                  </ul>
                )}
              </div>
            </div>
            {status === "Cancelled" ? (
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
                <div className="d-flex icon-content"  id='img-content'>
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
            </>
}
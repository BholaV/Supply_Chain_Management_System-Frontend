import axios from "axios";
import { useEffect, useState } from "react";
import { MdCurrencyRupee } from "react-icons/md";
export default function StockAlert(){
    const [product, setProduct] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3001/product/fetchLowStockProducts").then(result => {
            // console.log(result.data);
            setProduct(result.data);
        }).catch(err => {
            console.log(err);
        });
    }, [])
    return<>
        <div className="container border p-2">
        <h3>Stock Level</h3>
            <table className="table border">
                <thead>
                    <tr>
                        <th><h5>Sr. No.</h5></th>
                        <th style={{textAlign:'left'}}><h5>Product Name</h5></th>
                        <th><h5>Thumbnail</h5></th>
                        <th><h5>Price (<MdCurrencyRupee/>)</h5></th>
                        <th><h5>Quantity</h5></th>
                    </tr>
                </thead>
                <tbody>
                    {product?.map((item, index) => <tr>
                        <td><h5>{index+1}</h5></td>
                        <td style={{textAlign:'left'}}><h5>{item.title.slice(0,30)}</h5></td>
                        <td><img src={item.thumbnail} alt="no image found" style={{width:'70px',height:'50px'}}/></td>
                        <td><h5>{(item.price*10).toFixed(2)}</h5></td>
                        <td style={{color:'red'}}><h5>{item.stock}</h5></td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    </>
}
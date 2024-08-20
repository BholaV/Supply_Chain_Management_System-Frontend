import { MdEditSquare } from "react-icons/md";
import './SupplierCard.css'
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
export default function SupplierCard() {
  const [supplierDetail, setSupplierDetail] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState(null);
  const [ phoneErr,setPhonErr] = useState(null)
  const [productCategoryErr,setProductCategoryErr] = useState(null)
  const [formData, setFormData] = useState({
    contact: '',
    productCategory: '',
  });

  const style = {
    // backgroundImage: 'url("./Image/back.jpg")',
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    height: 'auto'
  };
  useEffect(() => {
    axios.get("http://localhost:3001/supplier/allSuppliers").then(result => {
      setSupplierDetail(result.data.supplier)
    }).catch(err => {
      console.log(err);
    });
  }, [])

  const handleEditClick = (supplier) => {
    setPhonErr("")
    setProductCategoryErr("")
    setCurrentSupplier(supplier);
    setFormData({
      contact: supplier.contact,
      productCategory: supplier.productCategory,
    });
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleContact = (event) => {
    const contactValue = event.target.value;
    const contactRegex = /^\d{10}$/;
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (contactRegex.test(contactValue)) {
        setPhonErr("");
    } else {
      setPhonErr('Invalid contact number');
    }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    const { contact, productCategory } = formData;
  
    // Validate contact
    if (contact.length !== 10 || !/^\d+$/.test(contact)) {
      setPhonErr("Contact must be a 10-digit number.");
      return;
    }
    if (!/^[a-zA-Z]+$/.test(productCategory)) {
      setProductCategoryErr('Product category must be alphabetic.')
      return;
    }
  
    axios.put(`http://localhost:3001/supplier/updateUser`, {
      name: currentSupplier.name, // Assuming 'name' is static or comes from currentSupplier
      contact: formData.contact,
      productCategory: formData.productCategory,
      userId: currentSupplier._id
    })
      .then(response => {
        // Update local state with the updated supplier
        const updatedSupplier = response.data.user;
        const updatedSuppliers = supplierDetail.map(supplier =>
          supplier._id === updatedSupplier._id ? updatedSupplier : supplier
        );
        setSupplierDetail(updatedSuppliers);
        setIsEditing(false);
  
        // Show success alert
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Supplier details have been updated successfully.',
          confirmButtonColor: '#3085d6',
        });
      })
      .catch(error => {
        console.error('Error updating supplier:', error);
  
        // Show error alert
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong while updating the supplier. Please try again.',
          confirmButtonColor: '#d33',
        });
      });
  };


  const handleDelete = (id, index) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this supplier?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3001/supplier/removeSupplier/${id}`)
          .then(result => {
            const newSupplierDetail = [...supplierDetail];
            newSupplierDetail.splice(index, 1);
            setSupplierDetail(newSupplierDetail);
          })
          .catch(err => {
            console.log(err);
          });
        Swal.fire('Deleted!', 'Supplier has been deleted successfully.', 'success');
      }
    });
  }
  return (
    <>
      <section id='supply' style={style}>
        {supplierDetail?.map((data, index) =>
          <div className="card-container" key={index}>
            <span className="pro">PRO</span>
            <img className="round" src="https://randomuser.me/api/portraits/women/79.jpg" alt="user" />
            <h3 className='text-white'>{data.name}</h3>
            <h5 style={{ fontWeight: 'bold' }}>{data.contact}</h5>
            <p> <span className="fs-5">Product Category</span> <br /><span className="fs-5 fw-bold">{data.productCategory}</span> </p>
            <div className="d-flex m-0 w-100 justify-content-center align-items-center p-2" style={{ width: '200px' }}>
              <div className="buttons">
                <button className="edit-button me-3 mt-0" onClick={() => handleEditClick(data)}>
                  <MdEditSquare style={{ color: "white" }} />
                </button>
              </div>
              <button className="delete-button me-3 mt-0" onClick={() => handleDelete(data._id, index)}>
                <MdDelete style={{ color: "white" }} />
              </button>
            </div>
          </div>
        )}
      </section>
      {isEditing && (
        <section className="w-100 h-100 d-flex justify-content-center align-content-between bg-info">
          <div className="edit-form-container mt-4">
          <h2>Update Detail</h2>
            <form onSubmit={handleSubmit}>
              <label className="text-dark">
                Contact:
                <input id="input-feild"
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleContact}
                />
              {phoneErr && <span className="text-danger fw-normal" >{phoneErr}</span>}
              </label>
              <label className="text-dark">
                Product Category:
                <input id="input-feild"
                  type="text"
                  name="productCategory"
                  value={formData.productCategory}
                  onChange={handleChange}
                />
                   {productCategoryErr && <span className="text-danger fw-normal">{productCategoryErr}</span>}
                {/* { && <span className="text-danger">{productCategoryErr}</span>} */}
              </label>
              <div className="d-flex">
                <button type="button" className="btn btn-outline-danger border m-1" onClick={() => setIsEditing(false)}>Cancel</button>
                <button type="submit" className="btn m-1 bg-primary">Save</button>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  );

}
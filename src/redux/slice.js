import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchProducts = createAsyncThunk("fetch-products",async()=>{
    const response = await axios.get(process.env.REACT_APP_PRODUCT_VIEW_ALL);
    console.log(response.data.result);
    return response.data.result;
})

export const fetchSuppliers = createAsyncThunk("fetch-suppliers",async()=>{
    const response = await axios.get(process.env.REACT_APP_SUPPLIER_ALL);
    console.log(response.data.supplier)
    return response.data.supplier;
})


export const slice = createSlice({
    name: 'counter',
    initialState: {
        productList:[],
        supplierList:[],
        loading:false,
        error:null
    },
    reducers:{
        setProduct:(state,action)=>{
            state.productList=action.payload;
        },
        setSupplier:(state,action)=>{
            state.supplierList=action.payload;
        },
        removeProduct:(state,action)=>{
            state.productList=state.productList.filter(item=>item._id!==action.payload);
        },
        removeSupplier:(state,action)=>{
            state.supplierList=state.productList.filter(supplier=>supplier._id!==action.payload);
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchProducts.pending,(state,action)=>{
            state.loading = true;
        }).addCase(fetchProducts.fulfilled,(state,action)=>{
            state.loading = false;
            state.productList = action.payload;
        }).addCase(fetchProducts.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        }).addCase(fetchSuppliers.pending,(state,action)=>{
            state.loading = true;
        }).addCase(fetchSuppliers.fulfilled,(state,action)=>{
            state.loading = false;
            state.supplierList = action.payload;
        }).addCase(fetchSuppliers.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        })
    }
})

export default slice.reducer;
export const {setProduct,setSupplier,removeProduct,removeSupplier} = slice.actions;
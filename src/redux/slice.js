import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to fetch products
export const fetchProducts = createAsyncThunk("inventory/fetchProducts", async () => {
    const response = await axios.get(process.env.REACT_APP_PRODUCT_VIEW_ALL);
    return response.data.result;
});

// Thunk to fetch suppliers
export const fetchSuppliers = createAsyncThunk("inventory/fetchSuppliers", async () => {
    const response = await axios.get(process.env.REACT_APP_SUPPLIER_ALL);
    return response.data.supplier;
});

// Slice for managing products and suppliers
export const inventorySlice = createSlice({
    name: 'inventory',
    initialState: {
        productList: [], // Products array
        supplierList: [], // Suppliers array
        loading: false, // Loading state
        error: null // Error message
    },
    reducers: {
        setProduct: (state, action) => {
            state.productList = action.payload;
        },
        setSupplier: (state, action) => {
            state.supplierList = action.payload;
        },
        removeProduct: (state, action) => {
            state.productList = state.productList.filter(item => item._id !== action.payload);
        },
        removeSupplier: (state, action) => {
            state.supplierList = state.supplierList.filter(supplier => supplier._id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        // Handle fetchProducts async actions
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.productList = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Handle fetchSuppliers async actions
            .addCase(fetchSuppliers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSuppliers.fulfilled, (state, action) => {
                state.loading = false;
                state.supplierList = action.payload;
            })
            .addCase(fetchSuppliers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default inventorySlice.reducer;
export const { setProduct, setSupplier, removeProduct, removeSupplier } = inventorySlice.actions;

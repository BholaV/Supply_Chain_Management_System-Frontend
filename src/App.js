import './App.css';  // Import main CSS for styling
import Home from './dashboard/home';  // Home component
import Signin from './auth/signup-signin/sign-in';  // Sign-in component
import Signup from './auth/signup-signin/sign-up';  // Sign-up component
import { Routes, Route } from 'react-router-dom';  // Routing components
import SupplierCard from './dashboard/supplier-card';  // SupplierCard component
import SupplierAccCreation from './dashboard/supplier-account-form';  // Supplier account creation component
import Auth from './auth/authentication/auth';  // Auth wrapper for authenticated routes
import ProductInventry from './dashboard/product-inventory';  // Product inventory component
import StockAlert from './dashboard/stock-alert';  // Stock alert component
import MyOrder from './dashboard/my-order';  // MyOrder component
import NoRouteFound from './auth/invalid-routes/no-route-found';  // 404 Not Found component
import Auth2 from './auth/authentication/auth2';  // Auth2 wrapper for unauthenticated routes

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Routes for signup and signin pages (unauthenticated access) */}
        <Route path='/signup' element={<Auth2><Signup /></Auth2>} />
        <Route path='/signin' element={<Auth2><Signin /></Auth2>} />
        
        {/* Protected routes for authenticated users */}
        <Route path='/' element={<Auth><Home /></Auth>}>
            <Route index element={<SupplierCard />} />  {/* Default route */}
            <Route path='addSupplier' element={<SupplierAccCreation />} />  {/* Add supplier */}
            <Route path='product' element={<ProductInventry />} />  {/* Product inventory */}
            <Route path='notification' element={<StockAlert />} />  {/* Stock alerts */}
            <Route path='myorder' element={<MyOrder />} />  {/* Orders */}
            <Route path='card' element={<SupplierCard />} />
        </Route>
        
        {/* Catch-all route for 404 Not Found */}
        <Route path='*' element={<NoRouteFound />} />
      </Routes>
    </div>
  );
}

export default App;

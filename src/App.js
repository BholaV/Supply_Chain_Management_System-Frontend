
import './App.css';
import Home from './Components/Home';
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import { Routes, Route } from 'react-router-dom';
import SupplierCard from './Components/SupplierCard';
import SupplierAccCreation from './Components/SupplierAccCreation';
import Auth from './Components/Auth';
import ProductInventry from './Components/ProductInventry';
import StockAlert from './Components/StockAlert';
import MyOrder from './Components/MyOrder';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/' element={<Auth><Home /></Auth>}>
            <Route index element={<SupplierCard />} />
             <Route path='addSupplier' element={<SupplierAccCreation/>}/>
             <Route path='product' element={<ProductInventry/>}/>
             <Route path='notification' element={<StockAlert/>}/>
             <Route path='myorder' element={<MyOrder/>}/>
        </Route>
        <Route path='/card' element={<SupplierCard />} />
      </Routes>
    </div>
  );
}

export default App;

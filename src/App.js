
import './App.css';
import Home from './Components/Home';
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import { Routes, Route } from 'react-router-dom';
import SupplierCard from './Components/SupplierCard';
import SupplierAccCreation from './Components/SupplierAccCreation';
import Product from './Components/Product';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/home' element={<Home />}>
            <Route index element={<SupplierCard />} />
             <Route path='addSupplier' element={<SupplierAccCreation/>}/>
             <Route path='product' element={<Product/>}/>
        </Route>
        <Route path='/card' element={<SupplierCard />} />
      </Routes>
    </div>
  );
}

export default App;


import './App.css';
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import {Routes, Route} from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/' element={<Signup/>}/> 

      <Route path='/signin' element={<Signin/>}/> 
      </Routes>
        
    </div>
  );
}

export default App;

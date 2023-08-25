
import './App.css';
import Login from '../src/component/Login'
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';

import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './component/Home';
import Navbar from './component/Navbar';
import Createemployee from './component/Createemployee';
import Editemployee from './component/Editemployee';
import Listofemployee from './component/Listofemployee';
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"


function App() {
  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/create' element={<Createemployee/>}/>
        <Route path='/edit/:id' element={<Editemployee/>}/>
        <Route path='/list' element={<Listofemployee/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;

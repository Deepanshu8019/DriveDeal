import AddVehicle from './Pages/Admin/AddVehicle'
import Navbar from './Components/Common/Navbar';
import { Route, Routes } from 'react-router-dom';
import AllVehicles from './Components/core/AllVehicles';
import VehicleDetail from './Pages/Public/VehicleDetail';
import Login from './Pages/Admin/Login';
import AdminRoute from './Components/AdminFeatures/AdminRoute';
import About from './Pages/Public/About';
import Error from './Pages/Public/Error';
import Home from './Pages/Public/Home';
import ContactUs from './Pages/Public/ContactUs';
import Footer from './Components/Common/Footer';

function App() {

  return (
    // <div className='bg-[#004170] w-full'>
    <div className='bg-gray-800 w-full'>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='about' element={<About/>}></Route>
          <Route path='contactUs' element={<ContactUs/>}></Route>
          <Route path= '/detail/:id' element={<VehicleDetail/>}></Route>
          <Route path= '/login' element={<Login/>}></Route>
          <Route element={<AdminRoute />}>
            <Route path="/AddVehicle" element={<AddVehicle />} />
            <Route path= '/manageVehicle' element={<AllVehicles/>}></Route>
          </Route>
          <Route path= '*' element={<Error/>}></Route>
        </Routes>
        <Footer/>
    </div>
  )
}

export default App

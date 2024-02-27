import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/navBar/NavBar';
import { BusinessInformations } from './pages/business-information/Business-informations';
import { AllBusiness } from './pages/all-business/All-Business';
import { DeliveryAvailability } from './pages/delivery-availability/Delivery-Availability';


function App() {
  return (

    <div className='container'>
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path='/' element={<BusinessInformations />}></Route>
          <Route path='/allBusiness' element={<AllBusiness />}></Route>
          <Route path='/deliveryAvailability' element={<DeliveryAvailability />}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;

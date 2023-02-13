import React from "react";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import HomePage from "./Pages/HomePage/HomePage";
import {BrowserRouter, HashRouter,browserHistory, Routes, Route} from 'react-router-dom';
import Authorization from "./Pages/Authorization";
import EnterNewPassword from "./Pages/Authorization/EnterNewPassword/EnterNewPassword";
import ChoosePageCar from "./Pages/ChoosePageCar/ChoosePageCar";
// import ChoosePageBike from "./Pages/ChoosePageBike/ChoosePageBike";
import ChooseEgypt from "./Pages/ChooseEgypt/ChooseEgypt";
import ChooseItaly from "./Pages/ChooseItaly/ChooseItaly";
// import ChoosePageMilion from "./Pages/ChoosePageMilion/ChoosePageMilion";
import BuyTickets from "./Pages/BuyTickets/BuyTickets";
import Profile from "./Pages/Profile/Profile";
import AboutUs from "./Pages/AboutUs/AboutUs";
import Terms from "./Pages/Terms/Terms";
import Privacy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import Help from "./Pages/HelpCenter/Help";
import Winners from "./Pages/Winners/Winners";
import CheckPayment from "./Pages/CheckPayment/CheckPayment";
import Payments from "./Pages/BuyTickets/Payment";
import PaymentProcess from "./Pages/BuyTickets/Paymentprocess";

function App() {
  
  return(
      <HashRouter >
          <Routes>
            <Route path = "/" element = {<HomePage/>}/>
            <Route path = "/authorization" element = {<Authorization/>}/>
            <Route path = "/authorization/enternewpassword" element = {<EnterNewPassword/>}/>
            <Route path = "/choosepage" element = {<ChoosePageCar/>}/>
            {/* <Route path = "/choosepage_bike" element = {<ChoosePageBike/>}/>
            <Route path = "/choosepage_milion" element = {<ChoosePageMilion/>}/> */}
            <Route path = "/check_pay_status" element={<CheckPayment/>}/>
            <Route path = "/buy_tickets" element = {<BuyTickets/>}/>
            <Route path = "/profile" element = {<Profile/>}/>
            <Route path = "/about_us" element = {<AboutUs/>}/>
            <Route path = "/terms" element = {<Terms/>}/>
            <Route path = "/privacy" element = {<Privacy/>}/>
            <Route path = "/help" element = {<Help/>}/>
            <Route path = "/winners" element = {<Winners/>}/>
            <Route path = "/payment" element = {<Payments/>}/>
            <Route path = "/payment_process" element = {<PaymentProcess/>}/>
            {/* <Route path = "/choosepage_TripItaly" element = {<ChooseItaly/>}/>
            <Route path = "/choosepage_TripEgypt" element = {<ChooseEgypt/>}/> */}

          </Routes>
      </HashRouter>
  )
}

export default App
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';

import "./App.css";
import PrivateRoute from './PrivateRoute';
// auth components
import Homepage from "./Components/Pages/Homepage";
import DdoLogin from "./Components/Pages/Users/DdoLogin";
import DdoMobileLogin from "./Components/Pages/Users/DdoMobileLogin";

import StaffLogin from "./Components/Pages/BackendUser/StaffLogin";
import Register from "./Components/Pages/Users/Register";
// ddo components
import DdoDashboard from "./Components/Pages/Users/DdoDashboard";
import DeductorInfo from "./Components/Pages/Users/DeductorInfo";
import DataUpload from "./Components/Pages/Users/DataUpload";
import PendingDownloads from "./Components/Pages/Users/PendingDownloads";

import PanMaster from "./Components/Pages/Users/PanMaster";
// admin components
import Dashboard from "./Components/Pages/BackendUser/Dashboard";
import RequestedUsers from "./Components/Pages/BackendUser/RequestedUsers";
import ApprovedUsers from "./Components/Pages/BackendUser/ApprovedUsers";
import ViewVerify from "./Components/Pages/BackendUser/ViewVerify";
import Traces from "./Components/Pages/Users/Traces";
// common
import AboutUs from './Components/Pages/AboutUs';
import ContactUs from './Components/Pages/ContactUs';
import Reports from "./Components/Pages/Reports";
import GetAllDocuments from "./Components/Pages/Users/GetAllDocuments";
import TdsCertificateDownload from "./Components/Pages/Users/TdsCertificateDownload"
import MobileUserProfile from "./Components/Pages/Users/MobileUserProfile"
import DdoMobileRegistration from "./Components/Pages/Users/DdoMobileRegistration"





function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/home" component={Homepage} />

          <Route path="/ddologin" component={DdoLogin} />
          <Route path="/ddoMobilelogin" component={DdoMobileLogin} />
          <Route path="/stafflogin" component={StaffLogin} />
          <Route path="/register" component={Register} />
          <Route path="/mobileRegistration" component={DdoMobileRegistration} />

          
          <PrivateRoute path='/ddodashboard'>
            <DdoDashboard />
          </PrivateRoute>
          <PrivateRoute path='/ddoMobileProfile'>
            <MobileUserProfile />
          </PrivateRoute>
          <PrivateRoute path='/tdsCertificateDownload'>
            <TdsCertificateDownload />
          </PrivateRoute>
          <PrivateRoute path='/deductorinfo'>
            <DeductorInfo />
          </PrivateRoute>
         
          <PrivateRoute path='/dataupload'>
            <DataUpload />
          </PrivateRoute>
          <PrivateRoute path='/pendingDownloads'>
            <PendingDownloads />
          </PrivateRoute>
          <PrivateRoute path='/panmaster'>
            <PanMaster />
          </PrivateRoute>
          <PrivateRoute path='/getAllDocuments'>
            <GetAllDocuments />
          </PrivateRoute>


          <PrivateRoute path='/dashboard'>
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute path='/requestedlist'>
            <RequestedUsers />
          </PrivateRoute>
          <PrivateRoute path='/approvedusers'>
            <ApprovedUsers />
          </PrivateRoute>
          <PrivateRoute path='/viewverify'>
            <ViewVerify />
          </PrivateRoute>
          <PrivateRoute path='/traces'>
            <Traces />
          </PrivateRoute>
          <Route path="/reports" component={Reports} />

          <Route path="/about-us" component={AboutUs} />
          <Route path="/contact-us" component={ContactUs} />
          {/* <Route path="/home" component={Homepage} /> */}
          {/* <Route path="/ddodashboard" component={DdoDashboard} /> */}
          {/* <Route path="/deductorinfo" component={DeductorInfo} /> */}
          {/* <Route path="/dataupload" component={DataUpload} /> */}
          {/* <Route path="/PanMaster" component={PanMaster} /> */}
          {/* <Route path="/dashboard" component={Dashboard} /> */}
          {/* <Route exact path="/requestedlist" component={RequestedUsers} /> */}
          {/* <Route path="/approvedusers" component={ApprovedUsers} /> */}
          {/* <Route path="/registeredVV" component={RegisterVV} /> */}
          {/* <Route path="/Traces" component={Traces} /> */}
        </Switch>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
    </>
  );
}

export default App;

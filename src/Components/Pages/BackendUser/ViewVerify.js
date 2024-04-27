import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import Header from '../../Common/Header';
import Activebar from '../../Common/Activebar';
import SidebarBU from '../../Common/SidebarBU';
import Footer from "../../Common/Footer";
import DeductorInfoTable from '../../Common/DeductorInfoTable';
import { rejectApprove } from '../../../api/viewVerifyApi';
import { toast } from 'react-toastify';

const ViewVerify = () => {

  const history = useHistory();
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [companyData, setCompanyData] = useState(null);

  useEffect(() => {
    setUserData(location.state);


    setCompanyData(location.state);
  }, [location]);

  const approve = () => {
    const rejectApproveData = [{
      userId: companyData.userId,
      companyId: companyData.companyId,
      status: 1,
      remark: 'approved' // TODO: Get from user input?
    }];

    rejectApprove(rejectApproveData).then(res => {
      if (res && res.status && res.status === 'Success') {
        toast.success(`Company ${companyData.companyName} has been approved successfully`);
      }
    });
  }

  const reject = () => {
    const rejectApproveData = [{
      userId: companyData.userId,
      companyId: companyData.companyId,
      status: 2,
      remark: 'rejected' // TODO: Get from user input?
    }];

    rejectApprove(rejectApproveData).then(res => {
      if (res && res.status && res.status === 'Success') {
        toast.success(`Company ${companyData.companyName} has been rejected successfully`);
      }
    });
  }

  const cancel = () => {
    history.goBack();
  }

  return (
    <div>
      <Header />

      <Activebar />

      <div className="leftbox">
        <SidebarBU />
      </div>

      <div className="middlebox">
        <DeductorInfoTable data={userData} />

        <div className="button-container">
          <Button id="btn-vv-approve" className="first-btn" onClick={approve}>Approve</Button>
          <Button id="btn-vv-reject" onClick={reject}>Reject</Button>
          <Button id="btn-vv-cancel" className="end-btn" variant="secondary" onClick={cancel}>Cancel</Button>
        </div>
      </div>

      <div style={{ clear: "both" }}></div>

      <Footer />
    </div>
  );
}

export default ViewVerify;

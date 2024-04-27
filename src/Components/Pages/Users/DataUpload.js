// import React, { useState, useEffect } from "react";
// import Select from "react-select";
// import { Button } from "react-bootstrap";
// // import Calendar from 'react-calendar';
// import es from 'date-fns/locale/es';
// // import { format  from 'date-fns';

// import "./DataUpload.css";
// import Header from "../../Common/Header";
// import Footer from "../../Common/Footer";
// import SidebarBU from "../../Common/Sidebar";
// import Activebar from "../../Common/Activebar";
// import UploadFileTDS from "./UploadFileTDS";
// import ChallanSummaryTable from "./ChallanSummaryTable";
// import DeducteeSummaryTable from "./DeducteeSummaryTable";
// import { downloadFile, getDeductorInfo, getFinancialYearOptions, getFormTypeOptions } from "../../../api";
// import { URL } from '../../../shared/url';
// import { format } from 'date-fns';

// const DataUpload = () => {
//   const [ddo, setDdo] = useState(null);
//   const [fyOptions, setFyOptions] = useState([]);
//   const [formTypeOptions, setFormTypeOptions] = useState([]);
//   const [financialYear, setFinancialYear] = useState(null);
//   const [quarterType, setQuarterType] = useState(null);
//   const [formType, setFormType] = useState(null);
//   const [showSummary, setShowSummary] = useState({ show: false });
//   // const [fileExpiryDate, setFileExpiryDate] = useState(null);

//   // const [date, setDate] = useState(new Date());

//   // const onDateChange = (newDate) => {
//   //   setDate(newDate);
//   //   console.log(newDate);
//   // }







//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const formattedDate = date.toLocaleDateString('en-US', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric',
//     });
//     return formattedDate.replace('/', '.').replace('/', '.');
//   };



//   useEffect(() => {
//     getDeductorInfo().then(res => {
//       // var count = Object.keys(res).length;
//       // let countryArray = [];
//       // for (var i = 0; i < count; i++) {
//       //     countryArray.push({
//       //         value: res[i].ddoPan,
//       //         label: res[i].ddoPan,
//       //     });
//       // }
//       // setDdo(countryArray);
//       console.log(res);
//       setDdo(res?.ddoPan);
//     });
//   }, [])

//   useEffect(() => {
//     getFinancialYearOptions().then((financialYearsRes) => {
//       setFyOptions(financialYearsRes);
//     });
//   }, []);

//   useEffect(() => {
//     getFormTypeOptions().then((formTypesRes) => {
//       setFormTypeOptions(formTypesRes);
//     });
//   }, []);

//   const quarterOptions = [
//     { value: "Q1", label: "Q1" },
//     { value: "Q2", label: "Q2" },
//     { value: "Q3", label: "Q3" },
//     { value: "Q4", label: "Q4" },
//   ];

//   const handleFYSelect = (financialYear) => {
//     setFinancialYear(financialYear);
//   };

//   const handleQuarterSelect = (quarterType) => {
//     setQuarterType(quarterType);
//   };

//   const handleFormTypeSelect = (formType) => {
//     setFormType(formType);
//   };

//   const handleShowSummaryClick = () => {
//     setShowSummary({ show: true });
//   };

//   const downloadSummaryFile = () => {
//     const options = {
//       financialYear: financialYear.value,
//       formType: formType.value,
//       quarterType: quarterType.value
//     };

//     downloadFile(URL.downloadChallanSummaryApi, options);
//     downloadFile(URL.downloadDeducteeSummaryApi, options);
//   };

//   const resetForm = () => {
//     setFinancialYear(null);
//     setQuarterType(null);
//     setFormType(null);
//     setShowSummary(false);
//   };

//   return (
//     <>
//       <Header />

//       <Activebar />

//       <div className="leftbox">
//         <SidebarBU />
//       </div>

//       <div className="middlebox">
//         <div>
//           <div className="dropdown-2-tds">
//             <label>Finanacial Year</label>
//             <Select
//               className="dropdown-basic"
//               options={fyOptions}
//               value={financialYear}
//               onChange={handleFYSelect}
//               placeholder={"Select"}
//             />
//           </div>

//           <div className="dropdown-3-tds">
//             <label>Quarter</label>
//             <Select
//               className="dropdown-basic"
//               options={quarterOptions}
//               value={quarterType}
//               onChange={handleQuarterSelect}
//               placeholder={"Select"}
//             />
//           </div>

//           {/* <div className="dropdown-3-tds">
//             <label>Get Pan</label>
//             <h1>{ddo?.ddoPan}</h1>
//             <Select
//               className="dropdown-basic"
//               options={ddo}
//               value={ddo?.ddoPan}
//               onChange={handleQuarterSelect}
//               placeholder={"Select"}
//             />
//           </div> */}

//           <div className="dropdown-4-tds">
//             <label>Form Type</label>
//             <Select
//               className="dropdown-basic"
//               options={formTypeOptions}
//               value={formType}
//               onChange={handleFormTypeSelect}
//               placeholder={"Select"}
//             />
//           </div>






//           {showSummary.show && (
//             <>
//               <ChallanSummaryTable
//                 showSummary={showSummary}
//                 financialYear={financialYear}
//                 quarter={quarterType}
//                 formType={formType}
//               />
//               <DeducteeSummaryTable
//                 showSummary={showSummary}
//                 financialYear={financialYear}
//                 quarter={quarterType}
//                 formType={formType}
//               />
//             </>
//           )}

//           {/* <Form className="qar-form">
//             <Form.Label className="qar_enter">Enter QAR no.&nbsp;</Form.Label>
//             <Form.Control type="text" className="input-box-qar" name="user_Id" required />
//             <br/>
//           </Form> */}
//         </div>

//         <div className="button-container left-align">
//           <Button
//             id="btn-reset-tds"
//             variant="secondary"
//             onClick={resetForm}
//             disabled={!financialYear && !quarterType && !formType}
//             className="button-1"
//           >Reset</Button>
//           {showSummary.show && (
//             <Button id="btn-download-tds" onClick={downloadSummaryFile} className="button-2">Download</Button>
//           )}
//         </div>
//       </div>

//       <div style={{ clear: "both" }}></div>

//       <Footer />
//     </>
//   );
// };

// export default DataUpload;



import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Button } from "react-bootstrap";

import "./DataUpload.css";
import Header from "../../Common/Header";
// import UploadedDataList from "../../Common/UploadedDataList";

import Footer from "../../Common/Footer";
import SidebarBU from "../../Common/Sidebar";
import Activebar from "../../Common/Activebar";
import UploadFileTDS from "./UploadFileTDS";
import ChallanSummaryTable from "./ChallanSummaryTable";
import DeducteeSummaryTable from "./DeducteeSummaryTable";
import { downloadFile, getDeductorInfo, getFinancialYearOptions, getFormTypeOptions } from "../../../api";
import { URL } from '../../../shared/url';
import Form from "react-bootstrap/Form";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
// import { format } from 'date-fns';



const DataUpload = () => {
  const [ddo, setDdo] = useState(null);
  const [tan, setTan] = useState(null);

  const [fyOptions, setFyOptions] = useState([]);
  const [formTypeOptions, setFormTypeOptions] = useState([]);
  const [financialYear, setFinancialYear] = useState(null);
  const [quarterType, setQuarterType] = useState(null);
  const [formType, setFormType] = useState(null);
  const [showSummary, setShowSummary] = useState({ show: false });
  const [numberOfDownloadsAllowed, setNumberOfDownloadsAllowed] = useState(null);
  const [startDate, setStartDate] = useState('');

  // const [time, setTime] = useState(new Date());

  useEffect(() => {
    const userPan = sessionStorage.getItem("userPan");
    const userTan = sessionStorage.getItem("user-tan");
    setTan(userTan);


    getDeductorInfo(userPan).then(res => {    
        console.log(res);
      setDdo(res.ddoPan);

    });
  }, [])
  // const handleChange = (event) => {
  //   setDdo(event.target.value);
  // };
  const handleChange1 = (event) => {
    setNumberOfDownloadsAllowed(event.target.value);
  };
  useEffect(() => {
    getFinancialYearOptions().then((financialYearsRes) => {
      setFyOptions(financialYearsRes);
    });
  }, []);

  useEffect(() => {
    getFormTypeOptions().then((formTypesRes) => {
      setFormTypeOptions(formTypesRes);
    });
  }, []);
  const onDateChange = (date) => {
    setStartDate(date)     
  }


  const quarterOptions = [
    { value: "q1", label: "q1" },
    { value: "q2", label: "q2" },
    { value: "q3", label: "q3" },
    // { value: "Q", label: "27EQ" },
  ];


  const handleFYSelect = (financialYear) => {
    setFinancialYear(financialYear);
  };

  const handleQuarterSelect = (quarterType) => {
    setQuarterType(quarterType);
  };

  const handleFormTypeSelect = (formType) => {
    setFormType(formType);
  };

  const handleShowSummaryClick = () => {
    setShowSummary({ show: true });
  };

  const downloadSummaryFile = () => {
    const options = {
      financialYear: financialYear.value,
      formType: formType.value,
      quarterType: quarterType.value
    };

    downloadFile(URL.downloadChallanSummaryApi, options);
    downloadFile(URL.downloadDeducteeSummaryApi, options);
  };

  const resetForm = () => {
    setFinancialYear(null);
    setQuarterType(null);
    setFormType(null);
    setShowSummary(false);
  };

  return (
    <>
      <Header />

      <Activebar />

      <div className="leftbox">
        <SidebarBU />
      </div>

      <div className="middlebox">
        <div>
          <div className="dropdown-2-tds">
            <label>Finanacial Year</label>
            <Select
              className="dropdown-basic"
              options={fyOptions}
              value={financialYear}
              onChange={handleFYSelect}
              placeholder={"Select"}
            />
          </div>

          <div className="dropdown-3-tds">
            <label>Quarter</label>
            <Select
              className="dropdown-basic"
              options={quarterOptions}
              value={quarterType}
              onChange={handleQuarterSelect}
              placeholder={"Select"}
            />
          </div>

          <div className="dropdown-4-tds">
            <label>Form Type</label>
            <Select
              className="dropdown-basic"
              options={formTypeOptions}
              value={formType}
              onChange={handleFormTypeSelect}
              placeholder={"Select"}
            />
          </div>

          {/* <div className="dropdown-4-tds">
            <Form className="dropdown-5-tds">
              <Form.Label >
                Pan Number&nbsp;<span className="Mandatory_Staff">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={ddo}
                onChange={handleChange}
                className="dropdown-basic"
                placeholder="Enter Pan"
                name="user_Id"
                required
              />
            </Form>
          </div> */}
          <div className="dropdown-4-tds">
            <Form className="dropdown-5-tds">
              <Form.Label >
                File Expiry Date<span className="Mandatory_Staff"></span>
              </Form.Label>
              <div className="form-group">
                <DatePicker
                  selected={startDate}
                  onChange={onDateChange}
                  placeholderText="00--00-0000"
                  // timeFormat="HH:mm"
                  // timeIntervals={20}
                  // timeCaption="time"
                  dateFormat="dd-MM-yyyy"
                  minDate={new Date()}
                />
              </div>



            </Form>
          </div>

          <div className="dropdown-4-tds">

            <Form className="dropdown-5-tds">
              <Form.Label >
                Number Of Downloads Allowed<span className="Mandatory_Staff"></span>
              </Form.Label>
              <Form.Control
                type="text"
                value={numberOfDownloadsAllowed}
                onChange={handleChange1}
                className="dropdown-basic"
                placeholder="Enter no of downloads allowed"
                name="user_Id"
                required
              />


            </Form>
          </div>


          <UploadFileTDS
            fy={financialYear}
            qtr={quarterType}
            ft={formType}
            pan={ddo} 
            
            tan={tan} 

            fileED={startDate}
            noOfDownHap={numberOfDownloadsAllowed}
            showSummaryClick={handleShowSummaryClick}
            resetForm={resetForm}
          />


          {/* <UploadFileTDS
            fy={financialYear}
            qtr={quarterType}
            ft={formType}
            pan={ddo?.ddoPan}
            showSummaryClick={handleShowSummaryClick}
          /> */}

          {showSummary.show && (
            <>
              <ChallanSummaryTable
                showSummary={showSummary}
                financialYear={financialYear}
                quarter={quarterType}
                formType={formType}
              />
              <DeducteeSummaryTable
                showSummary={showSummary}
                financialYear={financialYear}
                quarter={quarterType}
                formType={formType}
              />
            </>
          )}

          {/* <Form className="qar-form">
            <Form.Label className="qar_enter">Enter QAR no.&nbsp;</Form.Label>
            <Form.Control type="text" className="input-box-qar" name="user_Id" required />
            <br/>
          </Form> */}
        </div>

        <div className="button-container left-align">
          <Button
            id="btn-reset-tds"
            variant="secondary"
            onClick={resetForm}
            disabled={!financialYear && !quarterType && !formType}
            className="button-1"
          >Reset</Button>
          {showSummary.show && (
            <Button id="btn-download-tds" onClick={downloadSummaryFile} className="button-2">Download</Button>
          )}
        </div>


      </div>

      <div style={{ clear: "both" }}></div>

      <Footer />
    </>
  );
};

export default DataUpload;


import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

const DeductorInfoTable = ({ data }) => {

  const [deductorData, setDeductorData] = useState([]);
  const [ddoData, setDdoData] = useState([]);
  const [companyName, setCompanyName] = useState(null);

  useEffect(() => {
    if (data) {
      const deductorDataFromRes = [
        { "Name of the Deductor": data.companyName },
        { "Tax Deduction Account Number": data.tanNumber },
        { "Permanent Account Number": data.panNumber },
        { "Deductor Category": null },
        { "Company Email ID": data.emailId },
        { "STD Code": null },
        { "Telephone No": data.landLineNumber },
        { "Mobile No": data.mobile },
        { "Flat/Door/Block No": null },
        { "Name of Premises/Building": data.premisesName },
        { "Road/Street/Lane": null },
        { "Area/Locality": data.area },
        { "Town/District/City": data.city },
        { "State": data.state },
        { "PIN Code": data.pinCode }
      ];

      const ddoDataFromRes = [
        { "Name Of the DDO": null },
        { "Designation of DDO": null },
        { "PAN of DDO": data.ddoPan },
        { "Date of Reporting as DDO": null },
      ];

      setDeductorData(deductorDataFromRes);
      setDdoData(ddoDataFromRes);
      setCompanyName(data.companyName);
    }
  }, [data]);

  const generateElement = (obj, i) => {
    const objKeys = Object.keys(obj);
    return (
      <tr key={i}>
        <td>{objKeys[0]}</td>
        <td>{obj[objKeys[0]]}</td>
      </tr>
    );
  };

  return (
    <>
      {deductorData.length ? (
        <>
          <div className="deductorinfo-table">
            <Table striped bordered hover style={{ width: "60%" }}>
              <thead>
                <tr>
                  <th>{companyName}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{deductorData.map((item, i) => generateElement(item, i))}</tbody>
            </Table>
          </div>

          <div className="deductorinfo-table">
            <Table striped bordered hover style={{ width: "60%" }}>
              <thead>
                <tr>
                  <th>DDO/Responsible Person Info</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{ddoData.map((item, i) => generateElement(item, i))}</tbody>
            </Table>
          </div>
        </>
      ) : (
        <h5>No data found</h5>
      )}
    </>
  );
};

export default DeductorInfoTable;

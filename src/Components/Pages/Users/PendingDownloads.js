


import React, { useMemo, useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { getPendingDownload, getDeductorInfo, pendingApproveApi } from "../../../api";
import { useHistory } from 'react-router';

import {
  useTable,
  useGlobalFilter,
  useFilters,
  useRowSelect,
  usePagination,
} from "react-table";

import "./PanMaster.css";
import Header from "../../Common/Header";
import Footer from "../../Common/Footer";
import Sidebar from "../../Common/Sidebar";
import Activebar from "../../Common/Activebar";
import GlobalFilter from "../../Common/GlobalFilter";
// import { downloadFile, getAllDoucuments } from "../../../api";
// import { URL } from '../../../shared/url';
import { toast } from 'react-toastify';

export const COLUMNS = [
   
  // {
  //   Header: "Name",
  //   accessor: "panNumber",
  // },
 
  {
    Header: "PAN Number",
    accessor: "panNumber",
  },
  {
    Header: "Financial Year",
    accessor: "financialYear",
  },
  {
    Header: "Document Name",
    accessor: "documentName",
  },
  {
    Header: "Form Type",
    accessor: "formType",
  },
];

// "createdDate": 1686175200000,
// "createdBy": 1,
// "modifiedDate": 1686175200000,
// "modifiedBy": 1,
// "id": 12,
// "documentName": "AYUPM0934H_PARTB_2022-23_2023-06-07-11-04.pdf",
// "panNumber": "APHPS4906H",
// "financialYear": "2023-2024",
// "quarterType": "Q1",
// "formType": "24Q",
// "numberOfDownloadsAllowed": 3,
// "numberOfDownloadsHappened": 7,
// "allowFurtherDownload": false,
// "fileExpiryDate": 1687392000000,
// "additionalDownloadRequest": false


const PendingDownloads = () => {
  const history = useHistory();

  const [pandata, setPanData] = useState([]);
  // const [userList, setUserList] = useState([]);
  // const [selectedTab, setSelectedTab] = useState(TANTYPES.PENDING);


  useEffect(() => {
    const userPan = sessionStorage.getItem("userPan");


    getDeductorInfo(userPan).then(res => {
      console.log(res);
      // setDdo(res.ddoPan);
      // setTan(res.tanNumber);


      getPendingDownload(res.tanNumber).then(res1 => {
        console.log(res1);
        if (res1.length > 0) {
          setPanData(res1)
        }

      });

    });



  }, [])


  // const [checkedItems, setCheckedItems] = useState([]);

  // const handleCheckboxChange = (itemId) => {

  //   if (checkedItems.includes(itemId)) {
  //     // Item already checked, remove it from checkedItems
  //     setCheckedItems(checkedItems.filter((id) => id !== itemId));
  //   } else {
  //     // Item not checked, add it to checkedItems
  //     setCheckedItems([...checkedItems, itemId]);
  //   }
  // };

  // const onOpprove = async () => {

  //   const selectedPans = {
  //     panNumbers: selectedFlatRows.map(selectedRow => selectedRow.original.pan)
  //   };
  //   console.log(selectedPans)
  //   if (checkedItems) {
  //     const validationErrors = {};

  //     checkedItems.map((item) => {
  //       const updatedString = item.documentName.replace(/'/g, '');
  //       // console.log(updatedString)
  //       validationErrors.documentName = updatedString;
  //       validationErrors.financialYear = item.financialYear;
  //       validationErrors.formType = item.formType;
  //       validationErrors.quarterType = item.quarterType;
  //       validationErrors.panNumber = item.panNumber;
  //       validationErrors.id = item.id;




  //     });



  //   }
  // }


  const columns = useMemo(() => COLUMNS, []);
  const defaultColumn = {
    Filter: GlobalFilter
  };

  const tableInstance = useTable(
    {
      columns,
      data: pandata,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [

          {
            id: "selection",
            Header: "Select",
            Cell: ({ row }) => (
              <Form.Check {...row.getToggleRowSelectedProps()} />
              // <Button {...row.getToggleRowSelectedProps()} id="btn-requested-vv" onClick={onOpprove} >Approve</Button>

            ),
          },
          ...columns,

          // {
          //   id: "selection1",
          //   Header: "Approve",
          //   Cell: ({ row }) => (
          //     // <Form.Check {...row.getToggleRowSelectedProps()} />
          //     <Button id="btn-requested-vv" onClick={onOpprove} >Approve</Button>

          //   ),
          // },
        ];
      });
    }
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    rows,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    prepareRow,
    selectedFlatRows,
    pageOptions,
    state,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter, pageIndex } = state;

  const downloadSelectedPan = () => {
    // const selectedPans = {
    //   panNumbers: selectedFlatRows.map(selectedRow => selectedRow[0].original)
    // };

    if (selectedFlatRows && selectedFlatRows.length) { //&& selectedTab === TANTYPES.PENDING
      console.log(selectedFlatRows[0].original.documentName);


      const options = {
        documentName: selectedFlatRows[0].original.documentName,
        financialYear: selectedFlatRows[0].original.financialYear,
        formType: selectedFlatRows[0].original.formType,
        panNumber: selectedFlatRows[0].original.panNumber,
        quarterType: selectedFlatRows[0].original.quarterType
      }

      const formdata = new FormData();
      formdata.append('req', JSON.stringify(options));
      formdata.append('idList', selectedFlatRows[0].original.id);



      pendingApproveApi(formdata).then(res => {
        console.log(res.message);
        toast.success(res.message);

        history.push("/DdoDashboard");


      });
    }
    // console.log(selectedPans)
    // downloadFile(URL.downloadPanApi, selectedPans);
  }

  // const downloadAllPan = () => {
  //   downloadFile(URL.downloadPanApi, { panNumbers: [] });
  // }

  return (
    <>
      <Header />

      <Activebar />

      <div className="leftbox">
        <Sidebar />
      </div>

      <div className="middlebox">
        {(pandata && pandata.length) ? (
          <div style={{ width: "80%" }}>
            <div>
              <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            </div>

            <div className="pagenation">
              <Button
                variant="outline-none"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                &lt;&lt;
              </Button>{" "}
              <span>
                Page{" "}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>{" "}
              </span>
              <Button
                variant="outline-none"
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                &gt;&gt;
              </Button>{" "}
            </div>

            <div style={{ clear: "both" }}></div>

            <div className="pan-master-table">
              <Table responsive {...getTableProps()}>
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}>{column.render("Header")}  </th>

                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => (
                          <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                        ))}

                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>

            <div className="button-container">
              <span className="text-table">Count of rows: {rows.length} rows</span>
              <div className="fill"></div>
              <Button
                id="btn-download-pan-selected"
                onClick={downloadSelectedPan}
                disabled={!selectedFlatRows || !selectedFlatRows.length}
              >
                Approve Selected
              </Button>
              {/* <Button
                id="btn-download-pan-all"
                className="button-2"
              >
                Approve All
              </Button> */}
            </div>
          </div>
        ) : (<h5>No pending download request found</h5>)}
      </div>

      <div style={{ clear: "both" }}></div>

      <Footer />
    </>
  );
};
export default PendingDownloads;

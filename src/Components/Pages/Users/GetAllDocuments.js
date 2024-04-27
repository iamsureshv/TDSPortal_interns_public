import React, { useMemo, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import {
  useTable,
  useGlobalFilter,
  useFilters,
  useRowSelect,
  usePagination,
} from "react-table";
import { Link } from "react-router-dom";

// import axiosClient from '../../../api/config';

import { toast } from 'react-toastify';
import "./GetAllDocuments.css";

import "./PanMaster.css";
import Header from "../../Common/Header";




import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import { Worker } from '@react-pdf-viewer/core'; // install this library


import Footer from "../../Common/Footer";
import Sidebar from "../../Common/Sidebar";
import Activebar from "../../Common/Activebar";
import GlobalFilter from "../../Common/GlobalFilter";

import {  downloadAllPdfFile, getAllDoucuments, deleteSelectedDownloads, IncreaseNumberOfDownload } from "../../../api";

const COLUMNS = [
  {
    Header: "Financial Year",
    accessor: "financialYear",
  },
  {
    Header: "PAN Number",
    accessor: "panNumber",
  },
  {
    Header: "Tan Number",
    accessor: "employerTan",
  },
  {
    Header: "Document Name",
    accessor: "documentName",
  },

  {
    Header: "Form Type",
    accessor: "formType",
  },
  {
    Header: "Downloads Allowed",
    accessor: "numberOfDownloadsAllowed",
  },
  // {
  //   Header: 'Actions',
  //   Cell: ({ row }) => (
  //     <button 
  //     // onClick={() => deleteFile(row.original.id)}
  //     >Delete</button>
  //   ),
  // },
];




const GetAllDocuments = () => {
  const [pandata, setPanData] = useState([]);
  // const [tandata, setTanData] = useState([]);
  // const [panData, setPanData] = useState([]);



  // Create new plugin instance
  const [pdfFile, setPdfFile] = useState(null);
  // const [error, setError] = useState(null);
  // for submit event




  const handlePdfFileChange = (userPan) => {
    setModalOpen(true);

    // const str = validationErrors.download_url;
    const newStr = userPan.slice(25);
    console.log(newStr);
    setPdfFile(newStr);


    // axiosClient
    //   .get(`/tds/pdf/getAllDoucuments?ddoTan=${userPan}`)
    //   .then(async (res) => {
    //     console.log(res)
    //     if (res) {
    //       const validationErrors = {};
    //       res.forEach((item) => {
    //         validationErrors.download_url = item.download_url;
    //       });

    //       const str = validationErrors.download_url;
    //       const newStr = str.slice(25);
    //       console.log(newStr);
    //       setPdfFile(newStr);


          
    //     } else {
    //       setError("Invalid API response");
    //     }
    //   })
    //   .catch((error) => {
    //     setError(error.message);
    //   });

  }







  useEffect(() => {


    const userPan = sessionStorage.getItem("user-tan")

    getAllDoucuments(userPan).then((res) => {
      console.log(res)
      setPanData(res);
    });



  }, []);


  const closeModal = () => {
    setModalOpen(false);
  };



  const columns = useMemo(() => COLUMNS, []);
  const defaultColumn = {
    Filter: GlobalFilter
  };


  // const viewItem = (itemId) => {

  //   console.log(itemId)
  //   setPanData((prevItems) =>
  //     prevItems.filter((item) => item.id !== itemId)
  //   );

  //   deleteSelectedDownloads(itemId).then(res => {
  //     toast.success(res.message);
  //   });
  // };

  const [modalOpen, setModalOpen] = useState(false);
  const [numberOfDownloadsAllowed, setNumberOfDownloadsAllowed] = useState(null);

  // const handleChange1 = (event) => {
  //   setNumberOfDownloadsAllowed(event.target.value);
  // };

  // const [numPages, setNumPages] = useState(null);
  // const [pageNumber, setPageNumber] = useState(1);

  // const onDocumentLoadSuccess = ({ numPages }) => {
  //   setNumPages(numPages);
  // };

  // const goToPrevPage = () =>
  //   setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

  // const goToNextPage = () =>
  //   setPageNumber(
  //     pageNumber + 1 >= numPages ? numPages : pageNumber + 1,
  //   );

  const handleRemoveItem = (itemId) => {

    console.log(itemId)


    setPanData((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );




    // setPanData((prevState) => {
    //   const updatedFiles = [...prevState.pandata];
    //   const itemIndex = updatedFiles.findIndex((item) => item.id === itemId);
    //   if (itemIndex !== -1) {
    //     updatedFiles.splice(itemIndex, 1);
    //   }
    //   return {
    //     pandata: updatedFiles,
    //   };
    // });

    deleteSelectedDownloads(itemId).then(res => {
      // toast.success(res.message);
      toast.success(res.message);

      // console.log(res)
    });


    // console.log(itemId)

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

          ...columns,

          {
            Header: 'Actions',
            Cell: ({ row }) => (

              <button onClick={() => handleRemoveItem(row.original.id)}>Delete</button>
            ),
          },
          {
            id: "view",
            Header: "View",
            Cell: ({ row }) => (

              
              <button onClick={() => handlePdfFileChange(row.original.download_url)}>View</button>
            ),
          },
          {
            id: "download",
            Header:
              <Button
                onClick={() => downloadAllPan()}

                className="login-button1"
                type="submit"
              >
                Download All
              </Button>,
            Cell: ({ row }) => (
              <a href={row.original.download_url} download> <Button> Download </Button></a>

              // <button onClick={() => downloadSelectedPan(row.original.employerTan)}

              // >Download</button>
            ),
          },

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
    // selectedFlatRows,
    pageOptions,
    state,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter, pageIndex } = state;

  // const downloadSelectedPan = (e) => {
  //   console.log(e)
  //   downloadFile(e);
  // }

  const downloadAllPan = () => {
    // const selectedPans = pandata.map(selectedRow => selectedRow.employerTan)


    // const string = selectedPans.join(',');
    // console.log(string)


    downloadAllPdfFile();
  }

  const sub = () => {

    //  const selectedPans = {
    //   panNumbers: selectedFlatRows.map(selectedRow => selectedRow.original.employerTan)
    // };
    // const selectedPans = selectedFlatRows.map(selectedRow => selectedRow.original.employerTan)

    // const selectedDownloads=  selectedFlatRows.map(selectedRow => selectedRow.original.numberOfDownloadsAllowed)    


    // const str = selectedPans[0];
    // const str1 = selectedDownloads[0];
    // console.log(numberOfDownloadsAllowed)

    const userPan = sessionStorage.getItem("user-tan")


    if (numberOfDownloadsAllowed) {
      IncreaseNumberOfDownload(userPan, numberOfDownloadsAllowed).then(res => {
        window.location.reload(false);

      });
    }
    else {
      alert("Please select any document")
    }



  }



  return (
    <>
      <Header />

      <Activebar />

      <div className="leftbox">
        <Sidebar />
      </div>

      <div className="middlebox">

        {(pandata && pandata.length) ? (
          <div style={{ width: "100%" }}>
            {/* <div style={{ flexDirection: 'row', justifyContent: "center", alignContent: 'center', alignItems: 'center', }}> */}
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

              <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

              <span>
                <span style={{ marginLeft: '10px' }}>Increase Number Of Download </span>
                <div className="searchbar">
                  <input
                    className="global-search-box"
                    value={numberOfDownloadsAllowed}
                    type="number"
                    // min="0"
                    placeholder="Increase Number Of Download "
                    onChange={(e) => {
                      setNumberOfDownloadsAllowed(e.target.value);
                    }}
                  />
                  <Link >
                    <Button
                      className="login-button2"
                      style={{ marginLeft: '10px' }}
                      disabled={!numberOfDownloadsAllowed}
                      onClick={sub}
                    >
                      Submit
                    </Button>
                  </Link>

                </div>
              </span>        
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
                        <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {page.map((row) => {
                    prepareRow(row);
                    // const { id } = row.original;

                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => (
                          <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                        ))}
                        {/* <td>
                          <button onClick={() => deleteFile(id)}>Remove</button>
                        </td> */}

                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>

            <div className="button-container">
              <span className="text-table">Count of rows: {rows.length} rows</span>
              <div className="fill"></div>
              {/* <Button
                id="btn-download-pan-selected"
                onClick={downloadSelectedPan}
                disabled={!selectedFlatRows || !selectedFlatRows.length}
              >
                Download Selected
              </Button>
              <Button
                id="btn-download-pan-all"
                className="button-2"
                onClick={downloadAllPan}
              >
                Download All
              </Button> */}
            </div>
          </div>
        ) : (<h5>No Uploaded Documents found</h5>)}


        {modalOpen && (

          <div className="modal">
            <div className="modal-content">
            <button className="close-button" onClick={closeModal}>
                Close
              </button>
              {/* {error ? (
                <div className="error-message">{error}</div>
              ) : ( */}
                <div className="pdf-container">
                  <Worker
                    workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js"
                  >
                    {pdfFile ? (
                      <Viewer fileUrl={pdfFile} />
                    ) : (
                      <div>Loading PDF...</div>
                    )}
                  </Worker>
                </div>
              {/* )} */}
            </div>
          </div>
        )}
      </div>
      <div style={{ clear: "both" }}></div>

      <Footer />
    </>
  );
};
export default GetAllDocuments;

import React, { useMemo, useEffect, useState } from "react";
import { Table } from "react-bootstrap";

import {
    useTable,
    useGlobalFilter,
    useFilters,
    useRowSelect,
    usePagination,
} from "react-table";
import { Link } from "react-router-dom";


import "./GetAllDocuments.css";

import "./PanMaster.css";




import { Viewer } from '@react-pdf-viewer/core'; // install this library
//import '@react-pdf-viewer/core/lib/styles/index.css';
//import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Worker } from '@react-pdf-viewer/core'; // install this library
import { toast } from 'react-toastify';


import GlobalFilter from "../../Common/GlobalFilter";
import { getMobileUserDownloadRequest, updateDocumentRestrictions } from '../../../api';



const COLUMNS = [
    {
        Header: "Quarter",
        accessor: "quarterType",
    },
];
const MobileUserTableDocument = ({ panData, userPanData }) => {
    const [pandata, setPanData] = useState([]);


    const [pdfFile, setPdfFile] = useState(null);
    // const [error, setError] = useState(null);




    const handlePdfFileChange = (userPa) => {
        setModalOpen(true);
        // console.log(userPn)
        const str = userPa;
        const newStr = str.slice(25);
        console.log(newStr);
        setPdfFile(newStr);
    }

    const [panNumber, setPanNumber] = useState(null);
    const [selectedRequests, setSelectedRequests] = useState([]);


    const handleDownloadClick = (row) => {
        setSelectedRequests([...selectedRequests, row]);


        const body = {
            "documentName": row.original.documentName,
            "financialYear": row.original.financialYear,
            "formType": row.original.formType,
            "quarterType": row.original.quarterType,
            "panNumber": panNumber,
            "numberOfDownloadsAllowed": row.original.numberOfDownloadsAllowed - 1,
            "numberOfDownloadsHappened": row.original.numberOfDownloadsHappened + 1,
            "fileExpiryDate": "2024-12-02",
        }

        updateDocumentRestrictions(body).then(res => {
            if (res) {
                // Create a new link
                const link = document.createElement('a');
                link.download = row.original.documentName;
                link.href = row.original.downloadUrl;
                // Append to the document
                document.body.appendChild(link);
                // Trigger the click event
                link.click();
                // Remove the element
                document.body.removeChild(link);
            }


        })
            .catch((err) => console.log(err));
        console.log("Download Clicked");
    };

    const handleReRequestClick = (row) => {
        if (selectedRequests.includes(row)) {
            setSelectedRequests(selectedRequests.filter((item) => item !== row));
            console.log("Re Request Clicked");
        } else {
            const body = {
                "documentName": row.original.documentName,
                "financialYear": row.original.financialYear,
                "formType": row.original.formType,
                "quarterType": row.original.quarterType,
                "panNumber": panNumber
            }
            getMobileUserDownloadRequest(body).then(res => {
                console.log(res)
                toast.success(res.message);
                setSelectedRequests([...selectedRequests, row]);
                // setSelectedRequests(selectedRequests.filter((item) => item !== row));
            })
                .catch((err) => console.log(err));

            console.log("Pending Download Request Clicked");
        }
    };


    useEffect(() => {
        setPanData(panData)
        setPanNumber(userPanData)
        console.log(panData)
    }, [panData,userPanData]);


    const closeModal = () => {
        setModalOpen(false);
    };


    const columns = useMemo(() => COLUMNS, []);
    const defaultColumn = {
        Filter: GlobalFilter
    };

    const [modalOpen, setModalOpen] = useState(false);

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
                        id: "view",
                        Header: "Certificate View",
                        Cell: ({ row }) => (
                            <Link onClick={() => handlePdfFileChange(row.original.downloadUrl)}>Preview</Link>
                        ),
                    },


                    {
                        id: 'download',
                        Cell: ({ row }) => (

                            <div>
                                {row.original.numberOfDownloadsAllowed > 0 ? (
                                    <Link onClick={() => handleDownloadClick(row)}>
                                        Download 
                                        {/* {row.original.numberOfDownloadsAllowed} */}
                                    </Link>
                                ) : (
                                    <Link
                                        disabled={selectedRequests.includes(row)}
                                        onClick={() => handleReRequestClick(row)}>
                                        {selectedRequests.includes(row) ? 'Pending Download Request' : 'Re Request'}
                                    </Link>
                                )}
                            </div>
                        ),
                    }
                ];
            });
        }
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
    } = tableInstance;
    return (
        <>
            {(pandata && pandata.length) ? (
                <div style={{ width: "100%" }}>
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
                                                <td {...cell.getCellProps()}>{cell.render("Cell")} </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </div>

                </div>
            ) :
                <div><h3>Loading</h3></div>
            }


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
                                    workerUrl="https://unpkg.com/pdfjs-dist@2.5.207/build/pdf.worker.min.js"
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


            <div style={{ clear: "both" }}></div>

        </>
    );
};
export default MobileUserTableDocument;









//         console.log("Re Request Clicked");
//     } else {

//         setSelectedRequests([...selectedRequests, row]);





//         console.log("Download Clicked");
//     }
// };
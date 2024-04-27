import React, { useMemo, useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
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
import { downloadFile, getPanNumbers } from "../../../api";
import { URL } from '../../../shared/url';

export const COLUMNS = [
  {
    Header: "SI No",
    accessor: "srNo",
  },
  {
    Header: "PAN",
    accessor: "pan",
  },
  {
    Header: "PAN Name (Name as per Deductor)",
    accessor: "name",
  },
  {
    Header: "Form Type",
    accessor: "formType",
  },
];

const PanMaster = () => {
  const [pandata, setPanData] = useState([]);

  useEffect(() => {
    getPanNumbers().then((res) => {
      setPanData(res);
    });
  }, []);

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
            ),
          },
          ...columns,
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
    const selectedPans = {
      panNumbers: selectedFlatRows.map(selectedRow => selectedRow.original.pan)
    };
    downloadFile(URL.downloadPanApi, selectedPans);
  }

  const downloadAllPan = () => {
    downloadFile(URL.downloadPanApi, { panNumbers: [] });
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
                        <th {...column.getHeaderProps()}>{column.render("Header")}</th>
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
                Download Selected
              </Button>
              <Button
                id="btn-download-pan-all"
                className="button-2"
                onClick={downloadAllPan}
              >
                Download All
              </Button>
            </div>
          </div>
        ) : (<h5>No PAN records found</h5>)}
      </div>

      <div style={{ clear: "both" }}></div>

      <Footer />
    </>
  );
};
export default PanMaster;

import React, { useEffect, useMemo, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import {
  useTable,
  useGlobalFilter,
  useFilters,
  useRowSelect,
  usePagination,
} from "react-table";

import "../BackendUser/ApprovedUsers.css";
import Header from "../../Common/Header";
import Footer from "../../Common/Footer";
import SidebarBU from "../../Common/SidebarBU";
import Activebar from "../../Common/Activebar";
import GlobalFilter from "../../Common/GlobalFilter";
import { TANTYPES } from '../../../shared/constants';
import { downloadFile, getTanApiUrl, getTanList } from '../../../api';

const COLUMNS = [
  {
    Header: "SI No",
    accessor: "si_no",
  },
  {
    Header: "TAN",
    accessor: "tanNumber",
    Filter: GlobalFilter,
  },
  {
    Header: "TAN Name (Name as per Deductor)",
    accessor: "companyName",
  },
  {
    Header: "Mobile No",
    accessor: "mobile",
  },
  {
    Header: "Email Id",
    accessor: "emailId",
  },
  {
    Header: "TAN Status",
    accessor: "status",
  },
];

const ApprovedUsers = () => {

  const [userList, setUserList] = useState([]);
  const [selectedTab, setSelectedTab] = useState(TANTYPES.ACTIVE);

  useEffect(() => {
    const url =  TANTYPES.ACTIVE;
    getTanList(url).then(activeTans => {
      setUserList(activeTans);
    });
  }, );

  const columns = useMemo(() => COLUMNS, []);

  const defaultColumn = {
    Filter: GlobalFilter,
  };

  const tableInstance = useTable(
    {
      columns,
      data: userList,
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
            Header: "Action",
            Cell: ({ row }) => (
              <Form.Check {...row.getToggleAllRowsSelectedProp} />
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
    pageOptions,
    state,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter, pageIndex } = state;

  const handleTabSelect = (e) => {
    setSelectedTab(e);
    getTanList(e).then(res => {
      setUserList(res);
    });
  }

  const downloadAll = () => {
    const urls = getTanApiUrl(selectedTab);
    if (urls && urls.downloadUrl) {
      downloadFile(urls.downloadUrl);
    }
  }

  return (
    <>
      <Header />
      <Activebar />

      <div className="leftbox">
        <SidebarBU />
      </div>

      <div className="middlebox">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

        <div className="pagenation">
          <Button
            variant="none"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            &lt;&lt;
          </Button>{" "}
          <span>
            <b> Page</b>{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <Button
            variant="none"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            &gt;&gt;
          </Button>
        </div>

        <div className="tan-master-table">
          <Tabs
            defaultActiveKey={TANTYPES.ACTIVE}
            id="tan-tabs"
            className="tan-tabs "
            style={{ width: "50%" }}
            onSelect={(e) => handleTabSelect(e)}
          >
            <Tab eventKey={TANTYPES.ACTIVE} title="Active Users">
              <Table
                striped
                bordered
                hover
                responsive
                {...getTableProps()}
              >
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}>
                          {column.render("Header")}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey={TANTYPES.INACTIVE} title="Deactived Users">
              <Table
                striped
                bordered
                hover
                responsive
                {...getTableProps()}
              >
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}>
                          {column.render("Header")}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Tab>
            {/* <Tab eventKey={TANTYPES.MOBILE} title="DeTale App Users">
              <Table
                striped
                bordered
                hover
                responsive
                style={{ width: "80%" }}
                {...getTableProps()}
              >
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}>
                          {column.render("Header")}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Tab> */}
          </Tabs>

        </div>

        <div className="button-container small-gap-top">
          <span className="text-table">Total user(s): {rows.length} user(s)</span>
          <div className="fill"></div>
          <Button id="btn-approved-download" onClick={downloadAll}>Download All</Button>
        </div>
      </div>

      <div style={{ clear: "both" }}></div>


      <Footer />
    </>
  );
};

export default ApprovedUsers;

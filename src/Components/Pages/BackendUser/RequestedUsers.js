import React, { useMemo, useState, useEffect } from "react";
import { useHistory } from 'react-router';
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

import "../BackendUser/RequestedUsers.css";
import Header from "../../Common/Header";
import Footer from "../../Common/Footer";
import SidebarBU from "../../Common/SidebarBU";
import Activebar from "../../Common/Activebar";
import GlobalFilter from "../../Common/GlobalFilter";
import { downloadFile, getTanApiUrl, getTanList } from '../../../api';
import { TANTYPES } from '../../../shared/constants';

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

const RequestedUsers = () => {

  const history = useHistory();
  const [userList, setUserList] = useState([]);
  const [selectedTab, setSelectedTab] = useState(TANTYPES.PENDING);

  useEffect(() => {
    const url =  TANTYPES.PENDING;
    getTanList(url).then(pendingTans => {
      setUserList(pendingTans);
    });
  }, []);

  const columns = useMemo(() => COLUMNS, []);
  const defaultColumn = { Filter: GlobalFilter };
  const tableInstance = useTable(
    {
      columns,
      data: userList,
      defaultColumn,
      stateReducer: (newState, action) => {
        if (action.type === "toggleRowSelected") {
          newState.selectedRowIds = {
            [action.id]: true
          }
        }

        return newState;
      },
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

  const handleTabSelect = (e) => {
    setSelectedTab(e);
    getTanList(e).then(res => {
      setUserList(res);
    });
  };

  const viewVerify = () => {
    if (selectedFlatRows && selectedFlatRows.length) { //&& selectedTab === TANTYPES.PENDING
      console.log(selectedFlatRows[0].original);
      history.push({
        pathname: '/viewverify',
        state: {
          userTan: selectedFlatRows[0].original.tanNumber,
          userId: selectedFlatRows[0].original.userId,
          companyId: selectedFlatRows[0].original.si_no,
          companyName: selectedFlatRows[0].original.companyName,
          emailId: selectedFlatRows[0].original.emailId,
          mobile: selectedFlatRows[0].original.mobile,

          status: selectedFlatRows[0].original.status,
          // tanNumber: selectedFlatRows[0].original.tanNumber,
          // userId: selectedFlatRows[0].original.userId,
        }
      });
    }
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
            <b>Page</b>{" "}
            <strong>{pageIndex + 1} of {pageOptions.length}</strong>{" "}
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
            defaultActiveKey={TANTYPES.PENDING}
            id="tan-tabs"
            className="tan-tabs"
            onSelect={(e) => handleTabSelect(e)}
          >
            <Tab eventKey={TANTYPES.PENDING} title="New registration">
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
            <Tab eventKey={TANTYPES.APPROVED} title="Approved list">
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
            <Tab eventKey={TANTYPES.REJECTED} title="Rejected list">
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
          </Tabs>
        </div>

        <div className="button-container small-gap-top">
          <span className="text-table">Total user(s): {rows.length} user(s)</span>
          <div className="fill"></div>
          {/* {
            selectedTab === TANTYPES.PENDING &&
            (<Button
              id="btn-requested-vv"
              onClick={viewVerify}
              disabled={!selectedFlatRows || !selectedFlatRows.length}
            >
              View & Verify
            </Button>)
          } */}
          <Button id="btn-requested-vv" onClick={viewVerify}>View & Verify</Button>
          <Button id="btn-requested-download" onClick={downloadAll}>Download All</Button>
        </div>
      </div>

      <div style={{ clear: "both" }}></div>

      <Footer />
    </>
  );
};
export default RequestedUsers;

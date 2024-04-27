// Not being used
import React, { useMemo } from "react";
import { Table } from "react-bootstrap";
import {
  useTable,
  useGlobalFilter,
  useFilters,
  useRowSelect,
  usePagination,
} from "react-table";
import { Checkbox } from "@material-ui/core"; // TODO: Change to another bootstrap checkbox and remove material UI package

import GlobalFilter from './GlobalFilter';

import mock_data from "../Pages/BackendUser/TanData.json";

const COLUMNS = [
  {
    Header: "SI No",
    accessor: "si_no",
  },
  {
    Header: "TAN",
    accessor: "tan",
    Filter: GlobalFilter,
  },
  {
    Header: "TAN Name (Name as per Deductor)",
    accessor: "Tan NameD",
  },
  {
    Header: "Mobile No",
    accessor: "mobileno",
  },
  {
    Header: "Email Id",
    accessor: "emailid",
  },
  {
    Header: "TAN Status",
    accessor: "Tan status",
  },
];

const UserTable = ({ users }) => {

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => mock_data, []); // TODO: Use users data from props

  const defaultColumn = useMemo(() => {
    return {
      Filter: GlobalFilter,
    };
  });

  const tableInstance = useTable(
    {
      columns,
      data,
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
              <Checkbox
                size="small"
                className="root"
                disableRipple
                style={{ color: "#364760", lineHeight: "1px" }}
                {...row.getToggleAllRowsSelectedProp}
              />
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

  return (
    <>
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
    </>
  );
}

export default UserTable;

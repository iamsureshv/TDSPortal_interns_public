import React, { useMemo } from "react";
import { useTable } from "react-table";
import { Button, Table } from "react-bootstrap";
import Select from "react-select";

import "./Traces.css";
import Header from '../../Common/Header';
import Footer from '../../Common/Footer';
import Sidebar from '../../Common/Sidebar';
import Activebar from '../../Common/Activebar';
import mock_data from "./TracesData.json";

const COLUMNS = [
  {
    Header: "Ack no",
    accessor: "Ack no"

  },
  {
    Header: "Form Type",
    accessor: "form type"
  },
  {

    Header: "Default status",
    accessor: "default ",
    Cell: e => {
      return (
        <div>
          <h8>yes</h8>
          {' '}<Button className="btn-green"></Button>

        </div>
      )
    }


  },
  {
    filterable: false,
    Header: "Traces TDS file",
    accessor: "traces",
    Cell: e => <a onClick="str23" href={e.value}>{e.value}</a>
  },
  {
    Header: "Form 16/16A",
    accessor: "form",
    Cell: e => <a onClick="str1" href={e.value}>{e.value}</a>
  }
]

const FYoptions = [
  { value: '2020', label: '2020' },
  { value: '2021', label: '2021' },
  { value: '2022', label: '2022' }
]

const Qoptions = [
  { value: '11/2/2022', label: '11/2/2022' },
  { value: '11/8/2022', label: '11/8/2022' },
  { value: '11/2/2023', label: '11/2/2023' }
]

const Traces = () => {
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => mock_data, [])
  const tableInstance = useTable({
    columns, data
  })

  const { getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow } = tableInstance

  return (
    <>

      <Header />

      <Activebar />

      <div className="leftbox" >
        <Sidebar />
      </div>

      <div className="dropdown-1-traces">
        <label>Finanacial Year</label><br />
        <Select id="dropdown-basic" options={FYoptions} placeholder={'Select'} />
      </div>

      <div className="dropdown-2-traces">
        <label>Quarter</label><br />
        <Select id="dropdown-basic" options={Qoptions} placeholder={'Select'} />
      </div>

      <Table style={{ width: '70%', marginLeft: '9%' }} responsive className="traces-table" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} >
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}

        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </Table>

      <div className="button-container-tds"  >
        <Button id="btn-reset-tds">Reset</Button>
      </div>

      <div style={{ marginTop: '500px' }} >
        <Footer />
      </div>
    </>
  )
}

export default Traces
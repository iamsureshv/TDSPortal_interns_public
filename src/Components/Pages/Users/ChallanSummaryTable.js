import React, { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import { Table } from "react-bootstrap";
import { getChallanSummary } from '../../../api';

const COLUMNS = [
  {
    Header: "Month",
    accessor: "month",
  },
  {
    Header: "Amount deposited",
    accessor: "amountDeposited",
  },
  {
    Header: "Basic tax",
    accessor: "basicTax",
  },
  {
    Header: "Surcharge",
    accessor: "surcharge",
  },
  {
    Header: "Cess",
    accessor: "cess",
  }
];

const ChallanSummaryTable = ({ showSummary, financialYear, quarter, formType }) => {

  const [challanSummary, setChallanSummary] = useState([]);

  useEffect(() => {
    if (showSummary && financialYear && quarter && formType) {
      const data = {
        financialYear: financialYear.value,
        quarterType: quarter.value,
        formType: formType.value
      }

      getChallanSummary(data).then(challanSummaryRes => {
        if (challanSummaryRes && challanSummaryRes.detailsList && challanSummaryRes.detailsList.length) {
          const total = {
            month: challanSummaryRes.total,
            amountDeposited: challanSummaryRes.amountDepositedTotal,
            basicTax: challanSummaryRes.basicTaxTotal,
            surcharge: challanSummaryRes.surchargeTotal,
            cess: challanSummaryRes.cessTotal,
          }
          const tableData = challanSummaryRes.detailsList;
          tableData.push(total);
          setChallanSummary(tableData);
        }
      });
    }
  }, [showSummary,financialYear,formType,quarter]);

  const columns = useMemo(() => COLUMNS, []);
  const tableInstance = useTable({ columns, data: challanSummary });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <>
      <div className="gap-top-table total-table">
        <h4>Challan Summary</h4>
        {
          (challanSummary && challanSummary.length) ? (
            <Table style={{ width: "60%" }} {...getTableProps()}>
              <tbody>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        style={{ backgroundColor: "#364760", color: "white" }}
                        {...column.getHeaderProps()}
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </tbody>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (<h5>No challan summary found</h5>)
        }
      </div>
    </>
  );
};

export default ChallanSummaryTable;

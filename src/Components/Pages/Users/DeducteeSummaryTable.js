import React, { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import { Table } from "react-bootstrap";

// import "../../Common/Table.css";
import { getDeducteeSummary } from '../../../api';

const COLUMNS = [
  {
    Header: "Month",
    accessor: "month",
  },
  {
    Header: "Gross paid",
    accessor: "grossPaid",
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
  },
  {
    Header: "Total tax",
    accessor: "taxTotal",
  }
];

const DeducteeSummaryTable = ({ showSummary, financialYear, quarter, formType }) => {

  const [deducteeSummary, setDeducteeSummary] = useState([]);

  useEffect(() => {
    if (showSummary && financialYear && quarter && formType) {
      const data = {
        financialYear: financialYear.value,
        quarterType: quarter.value,
        formType: formType.value
      }

      getDeducteeSummary(data).then(deducteeSummaryRes => {
        if (deducteeSummaryRes && deducteeSummaryRes.deducteeRes) {
          const total = {
            month: deducteeSummaryRes.total,
            grossPaid: deducteeSummaryRes.grossPaidTotal,
            basicTax: deducteeSummaryRes.basicTaxTotal,
            surcharge: deducteeSummaryRes.surchargeTotal,
            cess: deducteeSummaryRes.cessTotal,
            taxTotal: deducteeSummaryRes.taxTotal,
          }
          const deducteeResMod = [];
          Object.keys(deducteeSummaryRes.deducteeRes).forEach(key => {
            deducteeResMod.push({ ...deducteeSummaryRes.deducteeRes[key], month: key });
          });
          const tableData = deducteeResMod;
          console.log(tableData);
          tableData.push(total);
          setDeducteeSummary(tableData);
        }
      });
    }
  }, [showSummary,financialYear,formType,quarter]);

  const columns = useMemo(() => COLUMNS, []);
  const tableInstance = useTable({ columns, data: deducteeSummary });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <>
      <div className="gap-top-table total-table">
        <h4>Deductee Summary</h4>
        {
          (deducteeSummary && deducteeSummary.length) ? (
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
            </Table>) : (<h5>No deductee summary found</h5>)
        }
      </div>
    </>
  );
};

export default DeducteeSummaryTable;

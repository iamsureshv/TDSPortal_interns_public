import React, { useMemo, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import {
  useTable,
  // useGlobalFilter,
  useFilters,
  useRowSelect,
  usePagination,
} from "react-table";
// import GlobalFilter from './GlobalFilter'
export const COLUMNS = [
    {
      Header: "File Type",
      accessor: "type",
    },
    {
      Header: "File Name",
      accessor: "name",
    },
    {
      Header: "File Size",
      accessor: "size",
    },
  
  ];

const UploadedDataList = ({ data ,onRemoveItem }) => {

  

  const handleRemoveItem = (itemId) => {
console.log(itemId)
onRemoveItem(itemId);

  
  };


  const [pandata, setPanData] = useState([]);

  useEffect(() => {

    if (data) {
        console.log(data)
        setPanData(data);      
    }
  }, [data]);


  const columns = useMemo(() => COLUMNS, []);
  // const defaultColumn = {
  //   Filter: GlobalFilter
  // };

  const tableInstance = useTable(
    {
      columns,
      data: pandata,
      // defaultColumn,
    },
    useFilters,
    // useGlobalFilter,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
        
          ...columns,
          {
            Header: 'Actions',
            Cell: ({ row }) => (
              
              <button onClick={() => handleRemoveItem(row.original.name)}>Delete</button>
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
        pageOptions,
    state,    
  } = tableInstance;

  const {  pageIndex } = state;
  
  return (
    <>


      

      <div className="middlebox">
        {(pandata && pandata.length>0) && (
          <div style={{ width: "100%" }}>
        

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
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>

            <div className="button-container">
              <span className="text-table">Count of rows: {rows.length} rows</span>
              <div className="fill"></div>             
            </div>
          </div>
        )}
      </div>


    </>
  );
};
export default UploadedDataList;

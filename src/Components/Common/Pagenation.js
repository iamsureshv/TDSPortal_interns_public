import React from 'react';
import { Button } from 'react-bootstrap';

const Pagenation = ({ previousPage, nextPage, canPreviousPage, canNextPage, pageOptions }) => {

  const { pageIndex } = state;

  return (
    <>
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
    </>
  );
}

export default Pagenation;

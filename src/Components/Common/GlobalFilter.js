import React, { useState } from "react";

import "./GlobalFilter.css";

const GlobalFilter = ({ filter, setFilter }) => {

  const [value, setValue] = useState(filter);

  return (
    <span>
            <span className="span1" style={{ marginLeft: '20px' }}>Search</span>

      <div className="searchbar">

        {/* <span>Search: </span> */}
        <input
          className="global-search-box"
          value={value || ""}
          placeholder="Search PAN No"
          onChange={(e) => {
            setValue(e.target.value);
            setFilter(e.target.value);
          }}
        />
      </div>
    </span>
  );
};

export default GlobalFilter;

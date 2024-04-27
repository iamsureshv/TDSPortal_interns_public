import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import "./Sidebar.css";

export const SidebarData = [
  {
    title: "Dashboard",
    link: "/ddodashboard",
  },
  {
    title: "Deductor Info",
    link: "/deductorinfo",
  },
  {
    title: "Pdf Certificate Upload",
    link: "/dataupload",
  },
  // {
  //   title: "View Documents",
  //   link: "/getAllDocuments",
  // },
  {
    title: "Additional Request",   
    link: "/pendingDownloads",
  },


  // {
  //   title: "Get All Document New ",   
  //   link: "/getAllDocumentNew",
  // },
  // {
  //   title: "PAN Master",
  //   link: "/PanMaster",
  // },
  // {
  //   title: "Reports",
  //   link: "/reports",
  // },
];

export class Sidebar extends Component {
  render() {
    return (
      // <div style={{overflow:"hidden"}} >
 <div className="Sidebar">
        <ListGroup className="SidebarList">
          {SidebarData.map((val, key) => {
            return (
              <ListGroup.Item
                key={key}
                className="row"
                id={window.location.pathname === val.link ? "active" : {}}
                onClick={() => {
                  window.location.pathname = val.link;
                }}
              >
                <div><left is="tds">{val.title}</left></div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </div>
      // </div>
     
    );
  }
}

export default Sidebar;

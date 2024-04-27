import React, { Component, } from 'react'
import './Sidebar.css';
import ListGroup from 'react-bootstrap/ListGroup'

export const SidebarData = [
  {
    title: "Dashboard",
    link: "/dashboard"
  },
  {
    title: "Registration list",
    link: "/requestedlist"
  },
  {
    title: "Approved users",
    link: "/approvedusers"
  },
  {
    title: "Reports",
    link: "/reports"
  },
]

export class SidebarBU extends Component {
  render() {
    return (
      <div className="Sidebar">
        <ListGroup className="SidebarList">
          {SidebarData.map((val, key) => {
            return (
              <ListGroup.Item

                key={key}
                className="row"
                id={window.location.pathname === val.link ? "active" : {}}
                onClick={() => { window.location.pathname = val.link }}
              >
                <div><left is="tds">{val.title}</left></div>
              </ListGroup.Item>
            )
          })}
        </ListGroup>

      </div>

    )
  }
}

export default SidebarBU

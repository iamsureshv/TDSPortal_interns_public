import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import "./Sidebar.css";

export const SidebarData = [
    {
        title: "Profile",
        link: "/ddoMobileProfile",
    },
    {
        title: "TDS Certificate Download",
        link: "/tdsCertificateDownload",
    },
 

 
];

export class SideBarMobileUser extends Component {
    render() {
        return (
            // <div style={{overflow:"hidden"}} >
            <div style={{backgroundColor: "#364760",  height: '40rem' ,  width: '100%'}}>
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

export default SideBarMobileUser;

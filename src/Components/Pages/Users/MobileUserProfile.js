import React, { Component } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from 'react-router-dom';

import "./DeductorInfo.css";
import Header from "../../Common/Header";
import Activebar from "../../Common/Activebar";
import SidebarMobileUser from '../../Common/SideBarMobileUser';
import Footer from "../../Common/Footer";
import {  getMobileUserProfile } from '../../../api';

class MobileUserProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            deductorData: [],
            ddoData: [],
            companyName: null,
            message: ''
        };
    }

    componentDidMount() {


        const message = sessionStorage.getItem("message")
        this.setState({ message: message })

        getMobileUserProfile().then(res => {
            console.log(res)




            const deductorDataFromRes = [
                { "Pan Number": res.userLogin },
                { "Mobile Number": res.mobile },
                { "Email Id": res.emailId },

            ];



            this.setState({
                deductorData: deductorDataFromRes,
                // ddoData: ddoDataFromRes,
                companyName: res.userLogin
            });
        })
            .catch((err) => console.log(err));

    }


    downloadSelectedPan = () => {
        this.props.history.push("/tdsCertificateDownload");


    }
    generateElement = (obj, i) => {
        const objKeys = Object.keys(obj);
        return (
            <tr key={i}>
                <td>{objKeys[0]}</td>
                <td>{obj[objKeys[0]]}</td>
                <td></td>
            </tr>
        );
    };

    render() {
        return (
            <div >
                <Header />

                <Activebar />

                <div className="leftbox">
                    <SidebarMobileUser />
                </div>

                <div className="middlebox">
                    {this.state.deductorData.length ? (
                        <>
                            <div className="deductorinfo-table">
                                <Table striped bordered hover style={{ 'width': '60%' }}>
                                    <thead>
                                        <tr><th></th><th>{this.state.companyName}</th><th></th></tr>
                                    </thead>
                                    <tbody>
                                        {this.state.deductorData.map((item, i) => this.generateElement(item, i))}
                                    </tbody>
                                </Table>
                            </div>
                        </>
                    ) : (<h5>No deductor data found</h5>)}
                    <div style={{ marginTop: '50px', marginLeft: '20%' }}>

                        <Link to='/tdsCertificateDownload'><Button>TDS Certificate Download</Button></Link>
                    </div>

                    <div style={{ marginTop: '50px',  backgroundColor:' #f1f1f1', marginLeft: '10%', position: 'absolute',bottom: 0,}} >
                        <h5>{this.state.message}</h5>

                    </div>


                </div>


                <div style={{ clear: "both" }}>
                </div>



                <Footer />
            </div>
        );
    }
}

export default MobileUserProfile;

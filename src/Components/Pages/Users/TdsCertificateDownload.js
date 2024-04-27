import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

import HeaderMobileUsers from '../../Common/HeaderMobileUsers';
import Footer from '../../Common/Footer';
import SidebarMobileUser from '../../Common/SideBarMobileUser';
import ActivebarMobileUser from '../../Common/ActivebarMobileUsers';
import "./TdsCertificateDownload.css";


import Select from "react-select";
import { getMobileUserProfile, getMobileUserFinacialYear, getMobileUserDocuments, getMobileUserTanType } from '../../../api';
import { Table } from "react-bootstrap";
import MobileUserTableDocument from '../Users/MobileUserTableDocument';


export default class TdsCertificateDownload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // userPan: '',
            mobileUserTan: '',
            visible: false,
            financialYear: '',
            selectedOption: '',
            isChecked1: [],
            idk: [],
            financialValue: "2023-2024",
            isChecked2: false,
            fyOptions: [],
            fyOptions1: [],
            document: '',
            panData: [],
            financeYear: [],
            formType: [],
            setLoading: true,
            userPan: ""
        }
    }

    componentDidMount() {
        getMobileUserProfile()
            .then(res => {
                this.setState({ document: res.responsiblePersonName });
                this.setState({ mobileUserTan: res.userLogin });
            })
            .catch(err => console.log(err));

        getMobileUserFinacialYear()
            .then(res => {
                this.setState({ fyOptions: res }, () => {
                    // if (this.state.fyOptions.length > 0) {
                    //     const defaultCheckboxValue = this.state.fyOptions[0].value;
                    //     // this.setState({ isChecked1: [defaultCheckboxValue] });
                    // }
                    this.fetchData();
                });
            })
            .catch(err => console.log(err));

        getMobileUserTanType()
            .then(res => {
                this.setState({ fyOptions1: res }, () => {
                    // Check if fyOptions1 has values before accessing the first element
                    if (this.state.fyOptions1.length > 0) {
                        const defaultCheckboxValue = this.state.fyOptions1[0].value;
                        this.setState(
                            {
                                isChecked1: [defaultCheckboxValue],
                            },
                            () => {
                                this.fetchData();
                            }
                        );
                    }
                });
            })
            .catch(err => console.log(err));

        // const ddoPan = sessionStorage.getItem("userLogin");

        this.fetchData(); // Fetch data immediately
    }



    fetchData = () => {
        console.log(this.state.financialValue);

        const type = this.state.isChecked1.join("");


        console.log(type)
        console.log(this.state.financialValue)

        this.setState({setLoading:true})

        getMobileUserDocuments(this.state.financialValue, type)
            .then((res) => {

                if (res.data) {

                    this.setState({setLoading:false})

                    console.log("Ravi", res.data.panNumber)
                    this.setState({ panData: res.data.mobDocRespList });
                    const validationErrors = {};
                    res.data.mobDocRespList.forEach((item) => {
                        validationErrors.financialYear = item.financialYear;
                        validationErrors.formType = item.formType;
                    });

                    this.setState({ financeYear: validationErrors.financialYear });

                    this.setState({ userPan: res.data.panNumber });

                    this.setState({ formType: validationErrors.formType });

                }



            })
            .catch((err) => console.log(err));
    };

    handlefinancialYear = (selectedOption) => {
        this.setState(
            { financialYear: selectedOption, financialValue: selectedOption.value },
            () => {
                this.fetchData();
            }
        );
    };

    handleCheckboxChange1 = (event) => {
        const value = event.target.value;
        const isChecked = event.target.checked;
        this.setState(
            (prevState) => {
                let updatedCheckedItems = [];
                if (isChecked) {
                    updatedCheckedItems = [value];
                }
                return { isChecked1: updatedCheckedItems };
            },
            () => {
                this.fetchData();
            }
        );
    };

    sub = () => {
        console.log(this.state.financialValue)
        console.log(this.state.financeYear)
        console.log(this.state.type)

    }
    render() {
        const { fyOptions1, isChecked1, userPan,  document, panData } = this.state;
        // const isDataAvailable = financeYear === financialValue && isChecked1.join("") === financeYear;

        return (
            <>
                <HeaderMobileUsers />

                <ActivebarMobileUser />

                <div className="leftbox">
                    <SidebarMobileUser />
                </div>

                <div className="middlebox">
                    <div>
                        <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                            <h2 style={{ textDecoration: 'underline' }}>TDS Certificate Download - {this.state.mobileUserTan}</h2>
                        </div>
                        <div className='tdsCertificateDownload_box' >
                            <div style={{ marginBottom: '30px', display: 'flex', alignContent: 'center', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                <div className="dropdown-2-tds">
                                    <label>Financial Year</label>
                                    <Select
                                        className="dropdown-basic"
                                        options={this.state.fyOptions}
                                        value={this.state.financialYear || this.state.fyOptions[0]}
                                        onChange={this.handlefinancialYear}
                                        placeholder="Select"
                                    />
                                </div>
                            </div>
                            <div style={{ paddingTop: '50', display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'space-around', alignItems: 'center' }}>
                                {fyOptions1.map((option, index) => (
                                    <label key={option.value}>
                                        <input
                                            style={{ marginRight: '5px' }}
                                            type="checkbox"
                                            id={option.value}
                                            value={option.value}
                                            checked={isChecked1.includes(option.value) || (isChecked1.length === 0 && index === 0)}
                                            onChange={this.handleCheckboxChange1}
                                        />
                                        {option.label}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>



                    {!this.state.setLoading ? (
                        <>
                            <div style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                <div className="deductorinfo-table">
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr><th>TDO TAN Details</th><th></th></tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>DDO Name</td>
                                                <td>{document}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                            <div>
                                <MobileUserTableDocument panData={panData} userPanData={userPan}/>
                            </div>
                        </>
                    ) : (
                        <div style={{ marginLeft: '30px' }}>
                            <h3 style={{ textAlign: 'center', fontFamily: 'sans-serif' }}>No data available for this Quarter</h3>
                        </div>
                    )}
                </div>
                <div style={{ clear: "both" }}></div>
                <Footer />
            </>
        );
    }





}

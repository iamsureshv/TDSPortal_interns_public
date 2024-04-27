

import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import { uploadPDFFile, uploadTDSFile } from '../../../api';
import './UploadFileTDS.css';
import { format } from 'date-fns';

import { toast } from 'react-toastify';
// import { withHooks } from 'react-table';
// import { withFilters, withGlobalFilter, withPagination, withRowSelect } from 'react-table';

import UploadedDataList from "../../Common/UploadedDataList";

class UploadFile extends Component {

  constructor(props) {

    super(props);
    this.errorUpdateInFile = this.errorUpdateInFile.bind(this);

    this.state = {
      selectedFile: ([]),
      csvdata: '',
      uploadError: false,
      successMessage: null,
      expDate: '',
      uploadedData: '',
    }
  }

  handleUploadFiles = files => {
    const MAX_COUNT = 500;
    let limitExceeded = false;
  
    const uploaded = [...this.state.selectedFile];
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        if (uploaded.length === MAX_COUNT) {
          // setFileLimit(true);
          if (uploaded.length > MAX_COUNT) {
            alert(`You can only add a maximum of ${MAX_COUNT} files`);
            // setFileLimit(false);
            limitExceeded = true;
            return true;
          }
        }
      }
      return false; // Ensure to return a boolean value in all cases
    });
  
    // Ensure to return the result of `limitExceeded`
    return limitExceeded;
  }
  

  // handleUploadFiles = files => {
  //   const MAX_COUNT = 500
  //   let limitExceeded = false;

  //   const uploaded = [...this.state.selectedFile];
  //   files.some((file) => {
  //     if (uploaded.findIndex((f) => f.name === file.name) === -1) {
  //       uploaded.push(file);
  //       if (uploaded.length === MAX_COUNT)
  //         // setFileLimit(true);
  //         if (uploaded.length > MAX_COUNT) {
  //           alert(`You can only add a maximum of ${MAX_COUNT} files`);
  //           // setFileLimit(false);
  //           limitExceeded = true;
  //           return true;
  //         }
  //     }


  //   })


  //   // files.forEach(file => {
  //   //   if (uploaded.findIndex(f => f.name === file.name) === -1) {
  //   //     uploaded.push(file);
  //   //     if (uploaded.length > MAX_COUNT) {
  //   //       limitExceeded = true;
  //   //       return;
  //   //     }
  //   //   }
  //   // });

  //   if (limitExceeded) {
  //     alert(`You can only add a maximum of ${MAX_COUNT} files`);
  //   } else {
  //     this.setState({ selectedFile: uploaded })

  //     // this.setState({ selectedFile: uploaded });
  //   }




  // }

  // handleFileChange = (event) => {
  //   const files = event.target.files;
  //   this.setState([...this.state.selectedFile, ...files]);
  // };


  onFileChange = (event) => {
    // const files = event.target.files;
    // this.setState((prevState) => ({
    //   selectedFile: [...prevState.selectedFile, ...files],
    // }));



    const filesArray = Array.from(event.target.files);

    // const chosenFiles = Array.prototype.slice.call(event.target.files)
    this.handleUploadFiles(filesArray);

    // const files = event.target.files;
    // this.setState({
    //   selectedFile: files,
    // });

    // this.setState({ selectedFile: event.target.files[0] });
  };



  onFileUpload = () => {
    const options = {
      quarterType: this.props.qtr.value,
      formType: this.props.ft.value,
      financialYear: this.props.fy.value
    }

    const formdata = new FormData();

    for (let i = 0; i < this.state.selectedFile.length; i++) {
      formdata.append('file', this.state.selectedFile[i]);
      // console.log("hhhh", this.state.selectedFile[i]);

    }

    formdata.append('model', JSON.stringify(options));

    uploadTDSFile(formdata).then(res => {
      this.setState({ uploadError: false });
      this.setState({ successMessage: res.message });
    });
  };

  // onPdfUpload = () => {
  //   const options = {
  //     quarterType: this.props.qtr.value,
  //     formType: this.props.ft.value,
  //     financialYear: this.props.fy.value,
  //     documentName: this.state.selectedFile?.name,
  //     panNumber: this.props.pan
  //   }
  onPdfUpload = () => {
    const validationErrors = {};

    const parsedDate = new Date(this.props.fileED);

    if (!isNaN(parsedDate)) {
      const expireDate = format(parsedDate, 'yyyy-MM-dd');
      console.log(expireDate);
      validationErrors.documentName = expireDate;

      //  this.setState({expDate: expireDate})
    } else {
      console.error('Invalid date');
    }

    //  const expireDate = format(new Date(this.props.fileED), 'yyyy/MM/dd')

    //     req={"documentName":"ACFPN1201K",
    // "financialYear":"2021-2022",
    // "formType":"24Q",
    // "quarterType":"q1",
    // "panNumber":"ACFPN1201K",
    // "numberOfDownloadsAllowed":"1",
    // "numberOfDownloadsHappened":"0",
    // "fileExpiryDate":"2023-12-02",
    // "employerTan":"BLRM05590E"
    // }


    const options = {
      quarterType: this.props.qtr.value,
      formType: this.props.ft.value,
      financialYear: this.props.fy.value,
      documentName: this.state.selectedFile?.name,
      panNumber: this.props.pan,
      numberOfDownloadsAllowed: this.props.noOfDownHap,
      fileExpiryDate: validationErrors.documentName,
      employerTan: this.props.tan

    }
    console.log(options)

    const formdata = new FormData();
    for (let i = 0; i < this.state.selectedFile.length; i++) {
      formdata.append('file', this.state.selectedFile[i]);

    }
    // formdata.append('file', this.state.selectedFile);
    formdata.append('req', JSON.stringify(options));


    uploadPDFFile(formdata).then(res => {
      this.setState({ uploadError: false });
      this.setState({ successMessage: res.message });
      console.log(res);
      toast.success(res.message);
      this.setState({ selectedFile: ([]) })
      this.props.resetForm()


    });
   

  };

  errorUpdateInFile = (result) => {
    var file = this.state.selectedFile;
    if (!file) {
      return;
    }

    var reader = new FileReader();
    reader.onload = (e) => {
      var contents = e.target.result;
      const json = contents.split("\r\n");
      var csv = "";
      var row = "Error Data," + json[0];
      csv += row + "\r\n";
      for (var i = 1, j = 0; i < json.length; i++) {
        row = "";
        if (result.errorLog[j] !== undefined && i === result.errorLog[j].row) {
          row = result.errorLog[j].errorData + "," + json[i];
          j++;
        } else {
          row = " ," + json[i];
        }
        csv += row + "\r\n";
      }
      this.setState({ csvdata: csv });
    };
    reader.readAsText(file);
  };

  dowloadErrorFile = () => {
    var hiddenElement = document.createElement("a");
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(this.state.csvdata);
    hiddenElement.target = "_blank";

    hiddenElement.download = this.state.selectedFile.name;
    hiddenElement.click();
  };

  // deleteFile = (index) => {

  // };


  handleRemoveItem = (itemId) => {
    // Filter out the item with the specified ID
    // const updatedData = data.filter((item) => item.id !== itemId);


    this.setState((prevState) => {
      const updatedFiles = [...prevState.selectedFile];
      updatedFiles.splice(itemId, 1);
      return {
        selectedFile: updatedFiles,
      };
    });

    // console.log(itemId)
    //  this.setState((prevFiles) =>
    //     prevFiles.filter((file) => file.name !== itemId)
    //   );



    //  deleteFile = (fileId) => {
    //   console.log("id")

    // };
  }



  render() {

    // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter } = this.props;




    //   const {
    //   getTableProps,
    //   getTableBodyProps,
    //   headerGroups,
    //   page,
    //   rows,
    //   nextPage,
    //   previousPage,
    //   canPreviousPage,
    //   canNextPage,
    //   prepareRow,
    //   selectedFlatRows,
    //   pageOptions,
    //   state,
    //   setGlobalFilter,
    // } = this.props;

    // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = this.props;

    const { qtr, fy, ft, fileED, noOfDownHap,   } = this.props;
    const isDisabled = !qtr || !fy || !ft || !fileED || !noOfDownHap;
    // || !fileE || !noOfDownHap || !pan;

    return (
      <>
        {/* <div className="input-container"> */}



        
          <div style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', width: '90%' }} >
            <div className='box'>
              <div
              >
                {/* <h2 className='upload-area-title'> upload File</h2> */}
                <form>
                  <input onChange={this.onFileChange}

                    type='file' multiple id='upload' hidden />
                  <label for="upload" className='uploadlabel'>
                    <span><i className='fa fa-cloud-upload'></i> </span>
                    <p>Click To Uplaod</p>
                  </label>
                </form>
              </div>
              {/* <div>
              <h3>Uploaded Documents</h3>

              {
                this.state.selectedFile.length > 0 && (
                  <div>
                    <ul>
                      {this.state.selectedFile.map((file, index) => (

                        <div class='showfilebox' key={index}>
                          <div className='left'>
                            <span className='filetype'>Pdf</span>
                            <h3>{file.name}</h3>
                          </div>
                          <div className='right' onClick={() => this.deleteFile(index)}>
                            <span>&#215;</span>
                          </div>
                        </div>
                      ))}
                    </ul>
                  </div>
                )
              }



            </div> */}

            </div>


          </div>


        {/* <div className="file-upload"> */}
        {/* <input
              type="file"
              multiple
              onChange={this.handleFileChange}
              className="file-input"
            /> */}
        {/* <button
                          onClick={this.handleFileChange}

              className="upload-button">
              Upload

            </button> */}
        {/* <ul className="file-list">
              {this.state.selectedFile.map((file, index) => (
                <li key={index} className="file-item">
                  <span>{file.name}</span>
                  <button
                    // onClick={() => handleRemoveFile(index)}
                    className="remove-button"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div> */}





        {/* <div style={{position: "absolute",
  bottom: "-35px",
  left: "10px",
  fontSize: "0.85rem",
  color: "#555"}}>
          <input onChange={this.onFileChange}
            type="file" id="file" class="file" />
          <label for="file">
            Select file
            <p class="file-name"></p>
          </label>
        </div> */}


        {/* <input
            type="file"
            multiple
            onChange={this.onFileChange}
            className="choosefile_btn"
            disabled={isDisabled}
          /> */}
        {/* </div > */}


        < div className="btn-container" >
          {/* <Button
            className={`upload-btn small-btn`}
            onClick={this.onFileUpload}
            disabled={isDisabled || !this.state.selectedFile}>
            Upload File
          </Button> */}

          < Button
            className={`upload-btn small-btn`
            }
            onClick={this.onPdfUpload}
            disabled={isDisabled || !this.state.selectedFile
            }
            >
            Upload PDF
          </Button >

          {/* <Button
            className={`show-summary-btn small-btn`}
            onClick={this.props.showSummaryClick}
            disabled={isDisabled}>
            Show Summary
          </Button> */}

          < Button
            className="er_download_btn blink_me"
            hidden={!this.state.uploadError}
            onClick={this.dowloadErrorFile}
          >
            Error File Download
          </Button >
        </div >
        <div>{this.state.successMessage}</div>

        {this.state.selectedFile
          &&
          <UploadedDataList data={this.state.selectedFile} onRemoveItem={this.handleRemoveItem} />

        }





      </>
    );
  }
}

export default UploadFile;


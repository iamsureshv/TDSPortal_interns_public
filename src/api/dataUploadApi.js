import axiosClient from './config';
import { URL } from '../shared/url';

export function getFinancialYearOptions() {
  return axiosClient.get(URL.getFinancialYearOptionsApi)
    .then(res => {
      if (res) {
        const options = res.map(financialYear => {
          return {
            value: financialYear,
            label: financialYear
          }
        });
        return options;
      }
    })
    .catch(error => {
      console.log(error);
      throw error;
    })
}

export function getFormTypeOptions() {
  return axiosClient.get(URL.getFormTypeOptionsApi)
    .then(res => {
      if (res) {
        const options = res.form_type.map(formType => {
          return {
            value: formType,
            label: formType
          }
        });
        return options;
      }
    })
    .catch(error => {
      console.log(error);
      throw error;
    })
}

export function uploadTDSFile(formdata) {
  return axiosClient.post(URL.uploadTDSFileApi, formdata)
    .then(res => {
      if (res) {
        return res;
      }
    })
    .catch(error => {
      console.log(error);
      throw error;
    })
}

export function uploadPDFFile(formdata) {
  return axiosClient.post(URL.uploadPdfApi, formdata)
    .then(res => {
      if (res) {
        return res;
      }
    })
    .catch(error => {
      console.log(error);
      throw error;
    })
}

export function getChallanSummary(model) {
  return axiosClient.post(URL.getChallanSummaryApi, model)
    .then(res => {
      if (res) {
        return res;
      }
    })
    .catch(error => {
      console.log(error);
      throw error;
    })
}

export function getDeducteeSummary(model) {
  return axiosClient.post(URL.getDeducteeSummaryApi, model)
    .then(res => {
      if (res) {
        return res;
      }
    })
    .catch(error => {
      console.log(error);
      throw error;
    })
}

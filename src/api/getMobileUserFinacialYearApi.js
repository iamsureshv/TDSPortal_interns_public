import axiosClient from './config';
// import { URL } from '../shared/url';

export function getMobileUserFinacialYear() {
  return axiosClient.get('/tds/api/getFinancialYear')
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

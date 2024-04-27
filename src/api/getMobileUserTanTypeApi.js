import axiosClient from './config';
// import { URL } from '../shared/url';

export function getMobileUserTanType() {
  return axiosClient.get('/tds/dashboard/getFormType')
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

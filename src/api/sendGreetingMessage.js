import axiosClient from './config';
import { URL } from '../shared/url';

export function sendGreetingMessage(data) {
  return axiosClient.post(URL.getGreetingMessageApi,data)
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

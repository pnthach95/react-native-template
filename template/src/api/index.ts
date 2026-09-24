import {create} from 'apisauce';

const baseURL = 'https://api.spacexdata.com/v4';
const API = create({baseURL});

API.addRequestTransform(request => {
  if (request.data instanceof FormData) {
    if (!request.headers) {
      request.headers = {};
    }
    request.headers['Content-Type'] = 'multipart/form-data';
  }
});

export const LINKS = {
  COMPANY: 'company',
};

export const setAPIToken = (token?: string | null) => {
  if (token) {
    API.setHeader('Authorization', 'Bearer ' + token);
  } else {
    API.deleteHeader('Authorization');
  }
};

export default API;

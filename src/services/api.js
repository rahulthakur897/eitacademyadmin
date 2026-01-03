import axios from "axios";

export const Api = {
  get: (base, path, config) => axios.get(base+path, config),
  post: (base, path, params) => axios.post(base+path, params),
  patch: (base, path, params) => axios.patch(base+path, params),
  delete: (base, path) => axios.delete(base+path),
  getUrl: (path, config) => axios.get(path, config),
  postUrl: (path, params, config) => axios.post(path, params, config),
  all: (path, url) => {
    const promiseArray = [];
    url.forEach((item) => {
        promiseArray.push(axios.get(path + item));
    });
    return axios.all([...promiseArray]);
  }
};
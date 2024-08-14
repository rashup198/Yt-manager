import axios from 'axios';

export const axiosInstance = axios.create({ });

export const apiConnector = (method, url, data, headers,params) => {

    return axiosInstance({
        method: method,
        url: url,
        data: data ? data : null,
        headers: headers ? headers : null,
        params:params?params:null
    })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            throw err;
        });
}

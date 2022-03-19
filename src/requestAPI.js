const axios = require('axios').default;
const publicIP = "http://15.188.76.190:2000/v1";

async function getRequest(url, data) {
    let res = {};
    await axios.get(publicIP + url, {
        params: data
    })
    .then(response => {
        res = response;
    })
    .catch(err => {
        res = err;
    })
    return res;
}

async function postRequest(url, data) {
    let res = {};
    axios.post(publicIP + url, data)
    .then(response => {
        res = response;
    })
    .catch(err => {
        res = err;
    })
    return res;
}

export {getRequest, postRequest}
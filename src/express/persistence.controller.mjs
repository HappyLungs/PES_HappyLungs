//const axios = require('axios').default;
import axios from 'axios';
//import config from '../configuration.json'

async function getRequest(url, data) {
    let res = {};
    await axios({
        method: 'get',
        url: "http://localhost:2000/v1" + url,
        params: { data },
        headers: {
            lfuzcudDtC36EFQW: "7j7C1I1vy46tpgwUybXt4y4tMlIVXKUSSQiHo73K1X3f3pZpoKHg7BzJK5sxEddkRmR3hID7vwcm",
            authorization: "PES2022"
        }
      })
      .then(response => {
          res = response.data;
      })
      .catch(err => {
          res = err;
      })
    return res;
}

async function postRequest(url, data) {
    let res = {};
    await axios({
        method: 'post',
        url: "http://localhost:2000/v1" + url,
        params: { data },
        headers: {
            lfuzcudDtC36EFQW: "7j7C1I1vy46tpgwUybXt4y4tMlIVXKUSSQiHo73K1X3f3pZpoKHg7BzJK5sxEddkRmR3hID7vwcm",
            authorization: "PES2022"
        }
      })
      .then(response => {
          res = response.data;
      })
      .catch(err => {
          res = err;
      })
    return res;
}

export {getRequest, postRequest}
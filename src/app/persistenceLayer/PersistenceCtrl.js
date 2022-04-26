const axios = require('axios').default;

let PersistenceCtrl;
(function() {
    let instance;
    PersistenceCtrl = function() {
        if (instance) return instance;
        instance = this;

        // initialize any properties of the singleton
        this.DB_URI = "http://ec2-15-237-124-151.eu-west-3.compute.amazonaws.com:7000/v1";
    };
}());


PersistenceCtrl.prototype.postRequest = async function (endpoint, params) {
    let res = {};
    await axios({
        method: 'post',
        url: this.DB_URI + endpoint,
        data: {
            params
        },
        headers: {
            "x-api-key": "7j7C1I1vy46tpgwUybXt4y4tMlIVXKUSSQiHo73K1X3f3pZpoKHg7BzJK5sxEddkRmR3hID7vwcm",
            "authorization": "PES2022"
        }
      })
      .then(response => {
          res = response.data;
      })
      .catch(err => {
          res = err;
      });
    return res;
};

PersistenceCtrl.prototype.getRequest = async function (endpoint, query) {
    let res = {};
    await axios({
        method: 'get',
        url: this.DB_URI + endpoint,
        params: query,
        headers: {
            "X-Api-Key": "7j7C1I1vy46tpgwUybXt4y4tMlIVXKUSSQiHo73K1X3f3pZpoKHg7BzJK5sxEddkRmR3hID7vwcm",
            "authorization": "PES2022"
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


PersistenceCtrl.prototype.putRequest = async function (endpoint, params) {
    let res = {};
    await axios({
        method: 'put',
        url: this.DB_URI + endpoint,
        data: params,
        headers: {
            "X-Api-Key": "7j7C1I1vy46tpgwUybXt4y4tMlIVXKUSSQiHo73K1X3f3pZpoKHg7BzJK5sxEddkRmR3hID7vwcm",
            "authorization": "PES2022"
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

PersistenceCtrl.prototype.getConversationbyID = async function (id) {
    const res = await fetch("http://ec2-15-237-124-151.eu-west-3.compute.amazonaws.com:7000/v1/conversation?_id=" + id, {
        method: 'GET',
        headers: {
          'X-Api-Key': '7j7C1I1vy46tpgwUybXt4y4tMlIVXKUSSQiHo73K1X3f3pZpoKHg7BzJK5sxEddkRmR3hID7vwcm',
          'Content-type': 'application/json'
        }
    });
    data = await res.json();
    return data;
}

PersistenceCtrl.prototype.getAllConversations = async function (id) {
    const res = await fetch("http://ec2-15-237-124-151.eu-west-3.compute.amazonaws.com:7000/v1/conversation", {
        method: 'GET',
        headers: {
          'X-Api-Key': '7j7C1I1vy46tpgwUybXt4y4tMlIVXKUSSQiHo73K1X3f3pZpoKHg7BzJK5sxEddkRmR3hID7vwcm',
          'Content-type': 'application/json'
        }
    });
    data = await res.json();
    return data;
}

module.exports = PersistenceCtrl;

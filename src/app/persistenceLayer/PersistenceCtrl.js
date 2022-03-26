let PersistenceCtrl;
(function() {
    let instance;
    PersistenceCtrl = function() {
        if (instance) return instance;
        instance = this;

        // initialize any properties of the singleton
        this.DB_URI = "http://localhost:2000/v1";
    };
}());


PersistenceCtrl.prototype.postRequest = async function (endpoint, params) {
    let res = {};
    await axios({
        method: 'post',
        url: this.DB_URI + endpoint,
        data: {
            params
        }
      })
      .then(response => {
          res = response.data;
      })
      .catch(err => {
          throw Error(err.code);
      })
    return res;
}
PersistenceCtrl.prototype.getRequest = async function (endpoint, query) {
    let res = {};
    await axios({
        method: 'get',
        url: this.DB_URI + endpoint,
        params: query
      })
      .then(response => {
          res = response.data;
      })
      .catch(err => {
        throw Error(err.code);
      })
    return res;
}

module.exports = PersistenceCtrl;
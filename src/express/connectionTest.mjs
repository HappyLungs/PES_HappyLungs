import { getRequest, postRequest } from './persistence.controller.mjs';


let params = {
    name: "exemple2",
    password: "12345",
    email: "exemple2@gmail.com",
    phone: "123456789",
    birthdate: "03-03-2001",
    location: "World",
    points: 0,
    language: "Catalan",
    healthStatus: "None"
}

let response = await postRequest("/newUser", params);
console.log(response);


/* axios({
    method: 'get', //you can set what request you want to be
    url: 'http://localhost:2000/v1/user',
    params: {_id: "622e3db2e949df09ae796cf2"},
    headers: {
        lfuzcudDtC36EFQW: "7j7C1I1vy46tpgwUybXt4y4tMlIVXKUSSQiHo73K1X3f3pZpoKHg7BzJK5sxEddkRmR3hID7vwcm",
        authorization: "PES2022"
    }
  })
  .then(response => {
      console.log(response);
  })
  .catch(err => {
      console.log(err);
  }) */
  

/* axios.post('http://localhost:2000/v1/newUser', {
    params: {
        name: "exemple",
        password: "12345",
        email: "exemple@gmail.com",
        phone: "123456789",
        birthdate: "03-03-2001",
        location: "World",
        points: 0,
        language: "Catalan",
        healthStatus: "None"
    }
    }, {
        headers: {
            lfuzcudDtC36EFQW: "7j7C1I1vy46tpgwUybXt4y4tMlIVXKUSSQiHo73K1X3f3pZpoKHg7BzJK5sxEddkRmR3hID7vwcm",
            authorization: "pes2022"
        }
    })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.log(error);
    }); */

/* axios.get('http://localhost:2000/v1/user', {
    params: {
        _id: "622e3db2e949df09ae796cf2"
    }
})
.then(returnStatement => {
    console.log(returnStatement.data)
})
.catch(error => {
    console.log(error);
}) */
const axios = require("axios");

axios.post('http://localhost:2000/v1/newUser', {
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
    })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.log(error);
    });

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
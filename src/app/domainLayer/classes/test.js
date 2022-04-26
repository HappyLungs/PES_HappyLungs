const fetch = require("node-fetch");




async function getData(id) {
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

async function getDa(id){
    let x = await getData(id);

console.log(x);
}


getDa("6263dbeb2a03a7d35d34e827");

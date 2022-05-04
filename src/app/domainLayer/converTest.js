const DomainCtrl = require("./DomainCtrl");

var dc = new DomainCtrl();

main = async function () {

    let c = await dc.fetchConversation();
    console.log("Result: ",c);
}

main();
const DomainCtrl = require("./DomainCtrl");

const dc = new DomainCtrl();

main = async function () {

    let c = await dc.fetchConversation();
    // console.log("Result: ",c);
}

main();
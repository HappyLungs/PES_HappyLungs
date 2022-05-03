const DomainCtrl = require("../DomainCtrl.js");

async function test() {
  test = new DomainCtrl();
  const x = await test.fetchNewConversations();
 console.log(x);
}

test();

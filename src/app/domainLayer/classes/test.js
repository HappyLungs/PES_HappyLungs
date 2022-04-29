const DomainCtrl = require("../DomainCtrl.js");

async function test() {
  test = new DomainCtrl();
  const x = await test.fetchConversation("626bfe2c8c2231ddb23ee15c");
  console.log(x);
}

test();

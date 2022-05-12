// Packages
const express = require("express");
const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');

// Routes related to serving html/css/js public resources
app.use(require("./routes/views"));

function listen() {
    app.listen(3000);
    console.log("Express app started on port " + 3000);
}

listen();
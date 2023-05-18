const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { router } = require("./src/routes");
const app = express();
const port = 5000;

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(router);

app.listen(port, () => console.log(`serve on port: ${port}`));

// app.get("/", (req, res) => {
//   res.send("Hello Semuanyaa!!!");
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

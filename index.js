const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { router } = require("./src/routes/index");
const app = express();
const helmet = require("helmet");

const port = 5001;

app.use(cors({ origin: "http://localhost:3001", credentials: true, }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(router);
app.use(helmet());

app.listen(port, () => console.log(`serve on port: ${port}`));

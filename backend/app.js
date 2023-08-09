// if (process.env.NODE_ENV !== "production") {
//    require("dotenv").config();
// }

const express = require("express");
const cors = require("cors");
const app = express();
const route = require("./routes");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", route);

// const port = process.env.PORT || 3000;
const port = 3000;

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`);
});

module.exports = app;

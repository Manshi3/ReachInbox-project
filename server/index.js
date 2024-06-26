const express = require("express");
// const session = require("express-session");
// const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// const mailRouter = require("./routes/mailroutes");
const googleRouter = require("./routes/googleroutes");
// const msRouter  = require("./routes/msroutes");

app.use(express.static('../frontend'));

app.use(bodyParser.json());
// app.use(cors());

app.use(express.urlencoded({ extended: true }));

// app.use(
//   session({
//     secret: "any_secret_key",
//     resave: false,
//     saveUninitialized: false,
//   })
// );

app.use("/google", googleRouter);
// app.use("/ms", msRouter);

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

// npm install express googleapis @google-cloud/tasks openai bullmq nodemailer dotenv


import "@babel/polyfill";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./server/routes/index";

const app = express();

app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
  })
);

app.use(express.json());
app.use(router);

app.get("/", (req, res) => {
  res.send(" Welcome To GTDoxx");
});

app.use("*", (req, res) =>
  res.status(404).json({
    status: "404",
    message: "route not found"
  })
);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

export default app;

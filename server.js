let projectData = {};
const express = require("express");

const app = express();
const port = 8008;
//parse the jison files from the clint side

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("website"));

const cors = require("cors");
app.use(cors());
app.post("/add", async (req, res) => {
  const info = await req.body;
  console.log(info);
  projectData = info;
  res.send(projectData);
  // res.json(projectData);
});

app.get("/all", async (req, res) => {
  // console.log(projectData);
  // res.send(projectData);
  if (projectData) {
    res.send(projectData);
  }
});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  // console.log("listening on port" + port);
});

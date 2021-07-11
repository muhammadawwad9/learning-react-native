const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
app.use(express.json());
//models
const Employee = require("./models/Employee");
dotenv.config();
const MONGOURL = process.env.MONGOURL;
mongoose.connect(MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongo");
});

mongoose.connection.on("error", (err) => {
  console.log("error: ", err);
});

app.get("/", async (req, res) => {
  try {
    const allEmployees = await Employee.find();
    return res.json({ all: allEmployees });
  } catch (err) {
    console.log("ERROR: ", err);
  }
});

app.post("/send-data", async (req, res) => {
  try {
    const employee = new Employee({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      salary: req.body.salary,
      position: req.body.position,
      picture: req.body.picture,
    });
    const savedEmployee = await employee.save();
    return res.json("saved");
  } catch (err) {
    console.log("ERROR: ", err);
  }
});

app.post("/delete", async (req, res) => {
  try {
    await Employee.findByIdAndRemove(req.body.id);
    return res.json("deleted");
  } catch (err) {
    console.log("ERROR: ", err);
  }
});

app.use("/update", async (req, res) => {
  try {
    await Employee.findByIdAndUpdate(req.body.id, {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      salary: req.body.salary,
      position: req.body.position,
      picture: req.body.picture,
    });
    return res.send("updated");
  } catch (err) {
    console.log("ERROR: ", err);
  }
});

app.listen(3000, () => {
  console.log("server is running");
});

const express = require("express");
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login");

const Clocking = require("../models/Clocking");
const Employee = require("../models/Employee");

router.get("/", (req, res) => {
  res.render("dashboard", {
    layout: "dashboard",
  });
});

//Show Clockings
router.get(
  "/clockings",
  connectEnsureLogin.ensureLoggedIn("/auth/login"),
  async (req, res) => {
    try {
      const clockings = await Clocking.find().populate("employee").lean();
      res.render("admin/clocking", {
        clockings,
      });
    } catch (err) {
      console.error(err);
      res.render("errors/500");
    }
  }
);

//Make Clocking
//Post /clocking
router.post("/clocking", async (req, res) => {
  const value = req.body.clock;
  const id = req.body.empId;

  try {
    const employees = await Employee.find({ _id: id });
    console.log(employees);
    const data = await Clocking.find({ employee: id })
      .populate("employee")
      .lean();
    if (employees.length != []) {
      if (value == "in") {
        const i = data.length;
        if (data.length != []) {
          const clockIn = getTimeStringpara(data[i - 1].clockIn);
          const clockOut = getTimeStringpara(data[i - 1].clockOut);
          console.log(clockIn);
          console.log(clockOut);
          if (clockIn === clockOut) {
            req.flash("msg_out", "You havent clock out, Please clock OUT.");
            res.redirect("/");
          } else {
            const time_string = getTimeString();
            await Clocking.create({ employee: id });
            req.flash("msg_in", `You clock In ${time_string}`);
            res.redirect("/");
          }
        } else {
          const time_string = getTimeString();
          await Clocking.create({ employee: id });
          req.flash("msg_in", `You clock In ${time_string}`);
          res.redirect("/");
        }
      }
      if (value == "out") {
        const i = data.length;
        if (data.length != 0) {
          const clockIn = getTimeStringpara(data[i - 1].clockIn);
          const clockOut = getTimeStringpara(data[i - 1].clockOut);
          if (clockIn == clockOut) {
            const id = data[i - 1]._id;
            const date = new Date();
            const time_string = getTimeString();
            await Clocking.findOneAndUpdate({ _id: id }, { clockOut: date });
            req.flash("msg_in", `You mark out ${time_string}`);
            res.redirect("/");
          } else {
            req.flash("msg_out", "You haven't clock IN");
            res.redirect("/");
          }
        } else {
          req.flash("msg_out", "You haven't clock IN");
          res.redirect("/");
        }
      }
    } else {
      req.flash("msg_out", "Invalid Employee Id");
      res.redirect("/");
    }
  } catch (error) {
    console.error(error);
    res.render("errors/500");
  }
});

function getTimeString() {
  const date = new Date();
  const h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  let d = date.getDate();
  let mo = date.getMonth() + 1;
  console.log(d);
  console.log(mo);
  const y = date.getFullYear();
  m = checkTime(m);
  s = checkTime(s);
  d = checkTime(d);
  mo = checkTime(mo);
  const time_string = `on ${d}/${mo}/${y}, at ${h}:${m}:${s}`;
  return time_string;
}

function getTimeStringpara(date) {
  const h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  let d = date.getDate();
  let mo = date.getMonth() + 1;
  console.log(d);
  console.log(mo);
  const y = date.getFullYear();
  m = checkTime(m);
  s = checkTime(s);
  d = checkTime(d);
  mo = checkTime(mo);
  const time_string = `on ${d}/${mo}/${y}, at ${h}:${m}:${s}`;
  return time_string;
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  } // add zero in front of numbers < 10
  return i;
}
module.exports = router;

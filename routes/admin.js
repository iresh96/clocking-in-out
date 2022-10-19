const express = require("express");
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login");

const Employee = require("../models/Employee");

//Show add page
router.get(
  "/add",
  connectEnsureLogin.ensureLoggedIn("/auth/login"),
  (_req, res) => {
    res.render("admin/add");
  }
);

//Show admin Dashboard
router.get(
  "/",
  connectEnsureLogin.ensureLoggedIn("/auth/login"),
  async (_req, res) => {
    res.render("admin");
  }
);

//POST Employee
router.post(
  "/",
  connectEnsureLogin.ensureLoggedIn("/auth/login"),
  async (req, res) => {
    try {
      await Employee.create(req.body);
      res.redirect("/admin");
    } catch (err) {
      console.error(err);
      res.render("errors/500");
    }
  }
);

// @desc    Show all Employees
// @route   GET /employee
router.get(
  "/employees",
  connectEnsureLogin.ensureLoggedIn("/auth/login"),
  async (_req, res) => {
    try {
      const employees = await Employee.find().sort({ _id: "asc" }).lean();
      res.render("admin/index", {
        employees,
      });
    } catch (err) {
      console.error(err);
      res.render("errors/500");
    }
  }
);

module.exports = router;

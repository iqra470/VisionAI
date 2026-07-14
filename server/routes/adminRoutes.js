const express = require("express");

const router = express.Router();

const protect =
require("../middleware/auth");

const adminOnly =
require("../middleware/adminmiddleware");

const {

  getAllUsers,

  getAdminStats,
 
  deleteUser,

  getRecentActivity 


} = require("../controllers/adminController");

router.get(

  "/users",

  protect,

  adminOnly,

  getAllUsers

);

router.get(

  "/stats",

  protect,

  adminOnly,

  getAdminStats

);

router.delete(

  "/users/:id",

  protect,

  adminOnly,

  deleteUser

);

router.get(

 "/activity",

 protect,

 adminOnly,

 getRecentActivity

);

module.exports = router;
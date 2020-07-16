const express = require('express');
const router = require("express").Router()
const ctrl = require("../controllers");


// routes
router.get("/", ctrl.auth.myAccount);
router.post("/register", ctrl.auth.register);
router.post("/login", ctrl.auth.login);
router.delete("/logout", ctrl.auth.logout);
router.post("/:id/like", ctrl.auth.addUserLike);
router.post("/:id/dislike", ctrl.auth.addUserDislike);
router.post("/:id/follow", ctrl.auth.follow);
router.get("/:id/anyAccount", ctrl.auth.anyAccount);

// exports

module.exports = router;
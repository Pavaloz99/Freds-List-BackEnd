const express = require('express');
const router = require("express").Router()
const ctrl = require("../controllers");


// routes
router.get("/", ctrl.auth.account)
router.post("/register", ctrl.auth.register);
router.post("/login", ctrl.auth.login);
router.delete("/logout", ctrl.auth.logout);

// exports

module.exports = router;
const router = require('express').Router()
const ctrl = require('../controllers');

// routes
router.get('/', ctrl.posts.index)
router.post('/', ctrl.posts.create)

// exports
module.exports = router
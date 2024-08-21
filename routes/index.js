const router = require('express').Router();

// Import our modular routers for /tips and /feedback
// const tipsRouter = require('./tips');
const feedbackRouter = require('./notes');
// TODO: import your diagnostics route

// router.use('/tips', tipsRouter);
router.use('/notes', feedbackRouter);
// TODO: Initialize diagnostics route

module.exports = router;

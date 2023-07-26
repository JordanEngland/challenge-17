const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');
const reactionRoutes = require('./reaction-routes');

router.use(userRoutes);
router.use(thoughtRoutes);
router.use(reactionRoutes);

module.exports = router;

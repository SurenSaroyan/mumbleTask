const router = require('express').Router();

const authRoutes = require('./auth.routes');
const leadsRoutes = require('./leads.routes');

router.use('/auth', authRoutes);
router.use('/leads', leadsRoutes);


module.exports = router;

const router = require('express').Router();
const { createLeads, getLeads, updateLeads } = new (require('../controllers/leads.controller'))();


router.post('/getLeads', getLeads);

router.post('/createLeads', createLeads);

router.post('/updateLeads', updateLeads);

module.exports = router;

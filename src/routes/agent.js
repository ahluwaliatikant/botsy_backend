const express = require('express');
const { myCreateAgent } = require('../controllers/create_agent');
const router = express.Router();

router.post("/" , myCreateAgent);

exports.agentRoutes = router;
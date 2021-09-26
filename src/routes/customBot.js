const express = require('express');
const { createCustomIntent } = require('../controllers/create_intent');
const router = express.Router();

router.post("/" , createCustomIntent);

exports.customIntentRoutes = router;
const express = require('express');
const { createIntent } = require('../controllers/create_intent');
const router = express.Router();

router.post("/" , createIntent);

exports.intentRoutes = router;
const express = require('express');
const { storeInDB } = require('../controllers/store_in_db');
const router = express.Router();

router.post("/" , storeInDB);

exports.webhookRoute = router;
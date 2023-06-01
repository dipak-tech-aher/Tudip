const express = require('express');
const userController = require('./../controllers/userController');

const router = express.Router();

router.post('/get-candidates', userController.getCandidates);
router.post('/get-candidate/:id', userController.getCandidate);
router.post('/add-candidates', userController.addCandidates);

module.exports = router;
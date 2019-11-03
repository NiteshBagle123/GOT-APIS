const express = require('express');
const router = express.Router();

const battle_controller = require('../controllers/battle.controller');

router.post('/create', battle_controller.create_battle);
router.get('/list', battle_controller.findAllBattleLocation);
router.get('/count', battle_controller.countNumberOfBattles);
router.get('/search', battle_controller.searchBattles);

module.exports = router;
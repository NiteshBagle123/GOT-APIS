const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const battleSchema = new Schema({
    name: { type: String, required: true },
    year: { type: Number, required: true },
    battle_number: { type: Number, required: true },
    attacker_king: { type: String },
    defender_king: { type: String },
    attacker_1: { type: String },
    attacker_2: { type: String },
    attacker_3: { type: String },
    attacker_4: { type: String },
    defender_1: { type: String },
    defender_2: { type: String },
    defender_3: { type: String },
    defender_4: { type: String },
    attacker_outcome: { type: String, required: true },
    battle_type: { type: String },
    major_death: { type: Number },
    major_capture: { type: Number },
    attacker_size: { type: Number },
    defender_size: { type: Number },
    attacker_commander: { type: String },
    defender_commander: { type: String },
    summer: { type: Number },
    location: {type: String, required: true },
    region: { type: String },
    note: { type: String }
});

battleSchema.index({
  attacker_king: 'text',
  defender_king: 'text',
  location: 'text',
  battle_type: 'text',
  region: 'text'
}, {
  weights: {
    attacker_king: 5,
    defender_king: 4,
    location: 3,
    battle_type: 2,
    region: 1
  },
});

module.exports = mongoose.model('battle', battleSchema);
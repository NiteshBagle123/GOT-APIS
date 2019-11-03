const Joi = require('joi');

module.exports = Joi.object({
    name: Joi.string().required(),
    year: Joi.number().required(),
    battle_number: Joi.number().required(),
    attacker_king: Joi.string().allow('').default(''),
    defender_king: Joi.string().allow('').default(''),
    attacker_1: Joi.string().allow('').default(''),
    attacker_2: Joi.string().allow('').default(''),
    attacker_3: Joi.string().allow('').default(''),
    attacker_4: Joi.string().allow('').default(''),
    defender_1: Joi.string().allow('').default(''),
    defender_2: Joi.string().allow('').default(''),
    defender_3: Joi.string().allow('').default(''),
    defender_4: Joi.string().allow('').default(''),
    attacker_outcome: Joi.string().required().valid('win', 'loss'),
    battle_type: Joi.string().allow('').default(''),
    major_death: Joi.number().allow(0).default(0),
    major_capture: Joi.number().allow(0).default(0),
    attacker_size: Joi.number().allow(0).default(0),
    defender_size: Joi.number().allow(0).default(0),
    attacker_commander: Joi.string().allow('').default(''),
    defender_commander: Joi.string().allow('').default(''),
    summer: Joi.number().allow(0).default(0),
    location: Joi.string().required(),
    region: Joi.string().allow('').default(''),
    note: Joi.string().allow('').default('')
}).required().error(() => 'Multiple battle information can not be added', { self: true });
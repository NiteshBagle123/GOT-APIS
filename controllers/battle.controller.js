const battleSchema = require('../schemas/battle.schema');
const Battle = require('../models/battle.model');

exports.create_battle = (req, res) => {
    if(!req.body) {
        return res.status(400).send([{
            code: 400,
            message: "Battle information can not be empty"
        }]);
    }

    if(!req.headers['content-type'] && req.headers['content-type'] !== 'application/json') {
        return res.status(415).send([{
            code: 415,
            message: "Content type not supported"
        }]);
    }

    const { error } = battleSchema.validate(req.body, { abortEarly: false });
    if (error) {
        if (error.details) {
            const errorObject = { messages: error.details.map(({ message }) => message) };
            res.status(400).json(errorObject.messages.map(messages => ({ code: 400, message: messages })));
        } else {
            res.status(400).json([{ code: 400, message: error.message }]);
        }
        return;
    }
    
    const battle = new Battle(
        {
            name: req.body.name,
            year: req.body.year,
            battle_number: req.body.battle_number,
            attacker_king: req.body.attacker_king,
            defender_king: req.body.defender_king,
            attacker_1: req.body.attacker_1,
            attacker_2: req.body.attacker_2,
            attacker_3: req.body.attacker_3,
            attacker_4: req.body.attacker_4,
            defender_1: req.body.defender_1,
            defender_2: req.body.defender_2,
            defender_3: req.body.defender_3,
            defender_4: req.body.defender_4,
            attacker_outcome: req.body.attacker_outcome,
            battle_type: req.body.battle_type,
            major_death: req.body.major_death,
            major_capture: req.body.major_capture,
            attacker_size: req.body.attacker_size,
            defender_size: req.body.defender_size,
            attacker_commander: req.body.attacker_commander,
            defender_commander: req.body.defender_commander,
            summer: req.body.summer,
            location: req.body.location,
            region: req.body.region,
            note: req.body.note
        }
    );

    battle.save().then(data => {
        res.status(200).send(data);
    }).catch(err => {
        const errMessage = err.message || 'Some error occurred while creating battle';
        const errCode = err.code || 500;
        res.status(errCode).send([{ code: errCode, errMessage }]);
    });
};

exports.findAllBattleLocation = (req, res) => {
    Battle.find()
    .then(battles => {
        res.status(200).json(battles.map(battle => ({ battleName: battle.name, battleLocation: battle.location || '' })));
    }).catch(err => {
        const errCode = err.code || 500;
        const errMessage = err.message || 'Some error occurred while creating battle';
        res.status(errCode).send([{ code: errCode, message: errMessage}]);
    });
};

exports.countNumberOfBattles = (req, res) => {
    Battle.find()
    .then(battles => {
        res.status(200).json({ numberOfBattles: Number(battles.length) || 0});
    }).catch(err => {
        const errCode = err.code || 500;
        const errMessage = err.message || "Some error occurred while calculating number of battles";
        res.status(500).send([{ code: errCode, message: errMessage }]);
    });
};

exports.searchBattles = (req, res) => {
    const { king, location, type, region } = req.query
    if(Object.keys(req.query).length === 0) {
        return res.status(400).send([{
            code: 400,
            message: "Atleast one query parameter needed for search"
        }]);
    }
    Battle.find({
        $or: [
            {
                attacker_king: { 
                    $eq: king , $exists: true
                } 
            }, 
            {
                defender_king: { 
                    $eq: king , $exists: true
                } 
            },
            {
                location: {
                    $eq: location  , $exists: true
                }
            },
            {
                battle_type: {
                    $eq: type  , $exists: true
                }
            },
            {
                region: {
                    $eq: region  , $exists: true 
                }
            }
        ]
    })
        .then(battles => res.status(200).json(battles))
        .catch(err => {
            const errCode = err.code || 500;
            const errMessage = err.message || "Some error occurred while calculating number of battles";
            res.status(500).send([{ code: errCode, message: errMessage }]);
        });
};
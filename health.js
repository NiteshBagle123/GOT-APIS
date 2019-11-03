const { WELCOME_MESSAGE, HEALTH_STATUS } = require('./constant');

module.exports = app => {
    app.get('/', (req, res) => {
        res.status(200).json([{ code: 200, message: WELCOME_MESSAGE }]);
    });

    app.get('/health', (req, res) => {
        res.status(200).json([{ code: 200, message: HEALTH_STATUS }]);
    });
}
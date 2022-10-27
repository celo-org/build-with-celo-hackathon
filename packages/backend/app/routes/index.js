const companies = require('./company.routes');

module.exports = (app) => {
    app.get('/api', (req, res) => {
        res.status(404).send('Not found');
    })
    app.use('/api/companies', companies)
};
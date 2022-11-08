const locationRoutes = require('./location.routes');
const categoryRoutes = require('./category.routes');
const collectorRoutes = require('./collector.routes');
const collectionCenterRoutes = require('./collectioncenter.routes');
const companyRoutes = require('./company.routes');
const requestRoutes = require('./request.routes');

module.exports = (app) => {
  app.get('/api', (req, res) => {
    res.status(403).json({ success: false, data: 'Invalid route' });
  });
  app.use('/api/collectors', collectorRoutes);
  app.use('/api/categories', categoryRoutes);
  app.use('/api/collectioncenters', collectionCenterRoutes);
  app.use('/api/companies', companyRoutes);
  app.use('/api/requests', requestRoutes);
  app.use('/api/locations', locationRoutes);
};

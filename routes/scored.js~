const dataCenterController = new (require('../controllers/DataCenterController'))();
const datacenterRouter = require('koa-router')({
    prefix: '/datacenter'
});

datacenterRouter.get('/', dataCenterController.dataCenters);
datacenterRouter.get('/:dataCenter', dataCenterController.dataCenter);
datacenterRouter.post('/', dataCenterController.addDataCenter, dataCenterController.dataCenters);
datacenterRouter.put('/:dataCenter', dataCenterController.updateDataCenter, dataCenterController.dataCenter);
datacenterRouter.delete('/:dataCenter', dataCenterController.deleteDataCenter, dataCenterController.dataCenters);

module.exports = datacenterRouter;
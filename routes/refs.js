const refsController = new (require('../controllers/RefsController'))();
const refsRouter = require('koa-router')({
    prefix: '/reff'
});

refsRouter.get('/', refsController.refs);
refsRouter.get('/:ref', refsController.ref);
refsRouter.post('/', refsController.addRef, refsController.refs);
refsRouter.put('/:ref', refsController.updateRef, refsController.ref);
refsRouter.delete('/:ref', refsController.deleteRef, refsController.refs);

module.exports = refsRouter;

const viewTopScorersController = new (require('../controllers/ViewTopScorers'))();
const viewTopScorersRouter = require('koa-router')({
    prefix: '/view'
});

viewTopScorersRouter.get('/', viewTopScorersController.viewTopScorers);


module.exports = viewTopScorersRouter;

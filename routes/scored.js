const scoredController = new (require('../controllers/ScoredController'))();
const scoredRouter = require('koa-router')({
    prefix: '/score'
});

scoredRouter.get('/', scoredController.scored);
scoredRouter.get('/:score', scoredController.scorer);
scoredRouter.post('/', scoredController.addScorer, scoredController.scored);
scoredRouter.put('/:score', scoredController.updateScorer, scoredController.scorer);
scoredRouter.delete('/:score', scoredController.deleteScorer, scoredController.scored);

module.exports = scoredRouter;

const playersController = new (require('../controllers/PlayersController'))();
const playersRouter = require('koa-router')({
    prefix: '/player'
});

playersRouter.get('/', playersController.players);
playersRouter.get('/:player', playersController.player);
playersRouter.post('/', playersController.addPlayer, playersController.players);
playersRouter.put('/:player', playersController.updatePlayer, playersController.player);
playersRouter.delete('/:player', playersController.deletePlayer, playersController.players);

module.exports = playersRouter;

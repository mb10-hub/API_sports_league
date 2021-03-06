const gamesController = new (require('../controllers/GameController'))();
const gamesRouter = require('koa-router')({
    prefix: '/game'
});

gamesRouter.get('/', gamesController.games);
gamesRouter.get('/:game', gamesController.game);
gamesRouter.post('/', gamesController.addGame, gamesController.games);
gamesRouter.put('/:game', gamesController.updateGame, gamesController.game);
gamesRouter.delete('/:game', gamesController.deleteGame, gamesController.games);

module.exports = gamesRouter;

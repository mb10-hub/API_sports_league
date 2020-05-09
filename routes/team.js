const teamController = new (require('../controllers/TeamController'))();
const teamRouter = require('koa-router')({
    prefix: '/team'
});

teamRouter.get('/', teamController.teams);
teamRouter.get('/:team', teamController.team);
teamRouter.post('/', teamController.addTeam, teamController.teams);
teamRouter.put('/:team', teamController.updateTeam, teamController.team);
teamRouter.delete('/:team', teamController.deleteTeam, teamController.teams);

module.exports = teamRouter;

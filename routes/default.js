const teamsRouter = require('./team');
const scoredRouter = require('./scored');
const refsRouter = require('./refs');
const playersRouter = require('./players');
const gamesRouter = require('./games');
const viewTopScorersRouter = require('./viewTopScorers');

const defaultRouter = require('koa-router')({
    prefix: '/api'
});

defaultRouter.get('/', ctx => {
    ctx.status = 200;
    ctx.body = "Default Route Found!";
});

defaultRouter.use(
    teamsRouter.routes(),
    scoredRouter.routes(),
    refsRouter.routes(),
    playersRouter.routes(),
    gamesRouter.routes(),
    viewTopScorersRouter.routes()
);

module.exports = api => {
    api.use(defaultRouter.routes());
};

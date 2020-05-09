const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class GamesController {
    constructor() {
        console.log('Games Controller Initialized!');
    }
    
    // Get all games played
    async games(ctx) {
        console.log('Controller HIT: DataCenterController::games');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Game';
            
            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying CHP.Game: ${err}`);
                }
                
                ctx.body = res;
                ctx.status = 200;
                
                resolve();
            });
        })
         .catch(err => {
            ctx.status = 500;
            ctx.body = err;
        });
    }

    // Get a Game
    async game(ctx) {
        console.log('Controller HIT: DataCenterController::game');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * Game WHERE game_id = ?;';
            const g = ctx.params.game_id;
            
            chpConnection.query({
                sql: query,
                values: [g]
            }, (err, res) => {
                if(err) {
                    reject(err);
                } 

                ctx.body = res;
                ctx.status = 200;
                resolve();
            });
        })
         .catch(err => {
            ctx.status = 500;
            ctx.body = {
                error: `Internal Server Error: ${err}`,
                status: 500
            };
        });
    }

    // Add a new Game
    async addGame(ctx, next) {
        console.log('Controller HIT: DataCenterController::addGame');
       return new Promise((resolve, reject) => {
           const newG = ctx.request.body;
           chpConnection.query({
               sql: 'INSERT INTO Game(game_id, playedOn, winner) VALUES (?, ?, ?);',
               values: [newG.game_id, newG.playedOn, newG.winner]
           }, (err, res) => {
               if(err) {
                   reject(err);
               }

               resolve();
           });
           
       })
        .then(await next)
        .catch(err => {
           ctx.status = 500;
           ctx.body = {
               error: `Internal Server Error: ${err}`,
               status: 500
           };
       });
    }

    // Update a Game
    async updateGame(ctx, next) {
        console.log('Controller HIT: DataCenterController::updateGame');
        return new Promise((resolve, reject) => {
            const g = ctx.request.body;
            chpConnection.query({
                sql: `UPDATE Game SET game_id = ?, playedOn = ?, winner = ? WHERE game_id = ?;`,
                values: [g.game_is, g.playedOn, g.winner, ctx.params.game_id]
            }, (err, res) => {
                if(err) {
                    reject(err);
                }

                resolve();
            });
        })
         .then(await next)
         .catch(err => {
            ctx.status = 500;
            ctx.body = {
                error: `Internal Server Error: ${err}`,
                status: 500
            };
        });
    }

    //delete a game
    async deleteGame(ctx, next) {
        console.log('Controller HIT: DataCenterController::deleteGame');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM Game WHERE game_id = ?;`,
                values: [ctx.params.gameID]
            }, (err, res) => {
                if(err) {
                    reject(err);
                }
                resolve();
            });
        })
        .then(await next)
        .catch(err => {
            ctx.status = 500;
            ctx.body = {
                error: `Internal Server Error: ${err}`,
                status: 500
            };
        });
    }
}

module.exports = GamesController;

const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class PlayersController {
    constructor() {
        console.log('Players Controller Initialized!');
    }
    
    // get all the Players
    async players(ctx) {
        console.log('Controller HIT: DataCenterController::Players');
        return new Promise((resolve, reject) => {
            const query = ' SELECT * FROM Players;';
            
            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying CHP.Teams: ${err}`);
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

    // get a single Player
    async player(ctx) {
        console.log('Controller HIT: DataCenterController::Player');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Players WHERE id = ?;';
            const p = ctx.params.player;  
        
            chpConnection.query({
                sql: query,
                values: [p]
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

    // Add a new Player
    async addPlayer(ctx, next) {
        console.log('Controller HIT: DataCenterController::addPlayer');
       return new Promise((resolve, reject) => {
           const newP = ctx.request.body;
           chpConnection.query({
               sql: 'INSERT INTO Players(player_name, DOB, year_started, position, foot, team_name ) VALUES (?, ?, ?, ?, ?, ?);',
               values: [newT.player_name, newT.DOB, newT.year_started, newT.position, newT.foot, newT.team_name] 
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

    // Update a Player
    async updatePlayer(ctx, next) {
        console.log('Controller HIT: DataCenterController::updatePlayer');
        return new Promise((resolve, reject) => {
            const p = ctx.request.body;
            chpConnection.query({
                sql: `UPDATE Players SET player_name = ?, DOB = ?, year_started = ?, position = ?, foot = ?, team_name = ?  WHERE id = ?;`,
                values: [p.player_name, p.DOB, p.year_started, p.position, p.foot, p.team_name, ctx.params.playerid]  // double check payerid params
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

    // Delete a player
    async deletePlayer(ctx, next) {
        console.log('Controller HIT: DataCenterController::deletePlayer');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM Players WHERE id = ?;`,
                values: [ctx.params.playerid] //same double check
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

module.exports = PlayersController;

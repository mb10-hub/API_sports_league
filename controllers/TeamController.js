const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class TeamController {
    constructor() {
        console.log('Team Controller Initialized!');
    }
    
    // get all the Teams
    async teams(ctx) {
        console.log('Controller HIT: DataCenterController::Teams');
        return new Promise((resolve, reject) => {
            const query = ' SELECT * FROM Teams;';
            
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

    // get a single Team
    async team(ctx) {
        console.log('Controller HIT: DataCenterController::Team');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Teams WHERE team_name = ?;'; //double check
            const t = ctx.params.team;   //should .team be .team_name
            
            chpConnection.query({
                sql: query,
                values: [t]
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

    // Add a new Team
    async addTeam(ctx, next) {
        console.log('Controller HIT: DataCenterController::addTeam');
       return new Promise((resolve, reject) => {
           const newT = ctx.request.body;
           chpConnection.query({
               sql: 'INSERT INTO Teams(team_name, coach, city, stadium) VALUES(?, ?, ?, ?);',
               values: [newT.team_name, newT.coach, newT.city, newT.stadium]
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

    // Update a Team
    async updateTeam(ctx, next) {
        console.log('Controller HIT: DataCenterController::updateTeam');
        return new Promise((resolve, reject) => {
            const t = ctx.request.body;
            chpConnection.query({
                sql: `UPDATE Teams SET coach = ?, city = ?, stadium = ?  WHERE team_name = ?;`,
                values: [t.coach, t.city, t.stadium, ctx.params.team]
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

    // Delete a Team
    async deleteTeam(ctx, next) {
        console.log('Controller HIT: DataCenterController::deleteTeam');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM Teams WHERE team_name = ?;`,
                values: [ctx.params.team]
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

module.exports = TeamController;

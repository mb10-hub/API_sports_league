const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class ScoredController {
    constructor() {
        console.log('Scored Controller Initialized!');
    }
    
    // Get all id from players who scored
    async scored(ctx) {
        console.log('Controller HIT: DataCenterController::scored');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Scored;';
            
            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying CHP.Scored: ${err}`);
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

    // get a single player who scored
    async scorer(ctx) {
        console.log('Controller HIT: DataCenterController::scorer');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Scored WHERE gaol_id = ?;';
            const S = ctx.params.goalID;
            
            chpConnection.query({
                sql: query,
                values: [S]
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

    // Add a new Scorer
    async addScorer(ctx, next) {
        console.log('Controller HIT: DataCenterController::addScorer');
       return new Promise((resolve, reject) => {
           const newS = ctx.request.body;
           chpConnection.query({
               sql: 'INSERT INTO Scored(goal_id, game_id, scoredBy) VALUES (?, ?, ?);',
               values: [newS.goal_id, newS.game_id, newS.scoredBy]
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

    // Update a Score
    async updateScorer(ctx, next) {
        console.log('Controller HIT: DataCenterController::updateScorer');
        return new Promise((resolve, reject) => {
            const S = ctx.request.body;
            chpConnection.query({
                sql: `UPDATE Scored SET goal_id = ?, game_id = ?, scoredBy = ? WHERE goal_id = ?;`,
                values: [S.goal_id, S.game_id, S.scoredBy, ctx.params.goalID]
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

    //delete scorer
    async deleteScorer(ctx, next) {
        console.log('Controller HIT: DataCenterController::deleteScorer');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM Scored WHERE goal_id = ?;`,
                values: [ctx.params.goalID]
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
/*
    //get the view i created for my database
    async viewTopScorers(ctx) {
        console.log('Controller HIT: DataCenterController::viewTopScorers');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM goals_view;';
            
            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying CHP.Scored: ${err}`);
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
*/
}

module.exports = ScoredController;

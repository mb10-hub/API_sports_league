const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class RefsController {
    constructor() {
        console.log('Refs Controller Initialized!');
    }
    
    // get all Refs
    async refs(ctx) {
        console.log('Controller HIT: DataCenterController::Refs');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Refs;';
            
            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying CHP.Refs: ${err}`);
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

    // get a single Ref
    async ref(ctx) {
        console.log('Controller HIT: DataCenterController::Ref');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Refs WHERE id = ?;';
            const R = ctx.params.RefID;
            
            chpConnection.query({
                sql: query,
                values: [R]
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

    // Add a new Ref
    async addRef(ctx, next) {
        console.log('Controller HIT: DataCenterController::addRef');
       return new Promise((resolve, reject) => {
           const newR = ctx.request.body;
           chpConnection.query({
               sql: 'INSERT INTO Refs(id, name, DOB) VALUES (?, ?, ?);',
               values: [newR.id, newR.name, newR.DOB]
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

    // Update a Ref
    async updateRef(ctx, next) {
        console.log('Controller HIT: DataCenterController::updateRef');
        return new Promise((resolve, reject) => {
            const R = ctx.request.body;
            chpConnection.query({
                sql: `UPDATE Refs SET id = ?, name = ?, DOB = ? WHERE id = ?; `,
                values: [R.id, R.name, R.DOB, ctx.params.RefID] //?
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

    //delete a Ref
    async deleteRef(ctx, next) {
        console.log('Controller HIT: DataCenterController::deleteRef');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM Refs WHERE id = ?;`,
                values: [ctx.params.RefID]
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

module.exports = RefsController;

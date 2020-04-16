const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class DataCenterController {
    constructor() {
        console.log('DataCenter Controller Initialized!');
    }
    
    // Fetches all Data Centers
    async dataCenters(ctx) {
        console.log('Controller HIT: DataCenterController::dataCenters');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM L6_DataCenter';
            
            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying CHP.L6_DataCenter: ${err}`);
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

    // Fetches a single Data Center
    async dataCenter(ctx) {
        console.log('Controller HIT: DataCenterController::dataCenter');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM L6_DataCenter WHERE name = ?;';
            const dc = ctx.params.dataCenter;
            
            chpConnection.query({
                sql: query,
                values: [dc]
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

    // Add a new DataCenter
    async addDataCenter(ctx, next) {
        console.log('Controller HIT: DataCenterController::addDataCenter');
       return new Promise((resolve, reject) => {
           const newDC = ctx.request.body;
           chpConnection.query({
               sql: 'INSERT INTO L6_DataCenter(name, city, state) VALUES (?, ?, ?);',
               values: [newDC.name, newDC.city, newDC.state]
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

    // Update a DataCenter
    async updateDataCenter(ctx, next) {
        console.log('Controller HIT: DataCenterController::updateDataCenter');
        return new Promise((resolve, reject) => {
            const dc = ctx.request.body;
            chpConnection.query({
                sql: `
                    UPDATE L6_DataCenter 
                    SET 
                        city = ?,
                        state = ?
                    WHERE name = ?
                    `,
                values: [dc.city, dc.state, ctx.params.dataCenter]
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

    async deleteDataCenter(ctx, next) {
        console.log('Controller HIT: DataCenterController::deleteDataCenter');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM L6_DataCenter WHERE name = ?;`,
                values: [ctx.params.dataCenter]
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

module.exports = DataCenterController;
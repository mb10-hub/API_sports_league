const chpConnection = require('../database/CHPConnection');

// Controller that interacts with server to retrieve data.
class ServerController {
    constructor() {
        console.log('Server Controller Initialized!');
    }

    // Fetches all servers
    async servers(ctx) {
        console.log('Controller HIT: ServerController::servers');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM L6_Server';

            chpConnection.query(query, (err, res) => {
                if (err) {
                    reject(`Error querying CHP.L6_Server: ${err}`);
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

    // Fetches a single server
    async server(ctx) {
        console.log('Controller HIT: ServerController::server');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM L6_Server WHERE id = ?;';
            const id = ctx.params.server;

            chpConnection.query({
                sql: query,
                values: [id]
            }, (err, res) => {
                if (err) {
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

    // Add a new Server
    async addServer(ctx, next) {
        console.log('Controller HIT: ServerController::addServer');
        return new Promise((resolve, reject) => {
            const newServer = ctx.request.body;
            chpConnection.query({
                sql: 'INSERT INTO L6_Server(id, hostName, L6_DataCenter, installedOn, powerOnAt) VALUES (?, ?, ?, ?, ?);',
                values: [newServer.id, newServer.hostName, newServer.L6_DataCenter, newServer.installedOn, newServer.powerOnAt]
            }, (err, res) => {
                if (err) {
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

    // Update a server
    async updateServer(ctx, next) {
        console.log('Controller HIT: ServerController::updateServer');
        return new Promise((resolve, reject) => {
            const server = ctx.request.body;
            chpConnection.query({
                sql: `
                    UPDATE L6_Server 
                    SET
                        hostName = ?,
                        L6_DataCenter = ?,
                        installedOn = ?,
                        powerOnAt = ?
                    WHERE id = ?
                    `,
                values: [server.hostName, server.L6_DataCenter, server.installedOn, server.powerOnAt, ctx.params.server]
            }, (err, res) => {
                if (err) {
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

    // Delete a server
    async deleteServer(ctx, next) {
        console.log('Controller HIT: ServerController::deleteServer');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM L6_Server WHERE id = ?;`,
                values: [ctx.params.server]
            }, (err, res) => {
                if (err) {
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

module.exports = ServerController;

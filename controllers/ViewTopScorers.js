const chpConnection = require('../database/CHPConnection');

class ViewTopScorersController{
    constructor() {
	console.log('ViewTopScorers Controller Initialize')
    }


    // get the view
    async viewTopScorers(ctx) {
	console.log('Controller HIT: View');
	return new Promise((resolve, reject) => {
	    const query = 'SELECT * FROM goals_view;';
	    chpConnection.query(query, (err, res) => {
		if(err) {
		    reject('ERROR');
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
}


module.exports = ViewTopScorersController;

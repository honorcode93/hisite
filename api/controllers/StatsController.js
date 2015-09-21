/**
 * StatsController
 *
 * @description :: Server-side logic for managing Stats
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	main: function(req, res){
		return res.view("statistics.ejs");
	}
};


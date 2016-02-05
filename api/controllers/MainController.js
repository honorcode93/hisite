/**
 * PlayerController
 *
 * @description :: Server-side logic for managing Players
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	main: function(req, res){
		return res.view("homepage.ejs");
	},

	listenToHI: function(req, res){
		sails.sockets.join(req.socket, 'hilisten');
		res.json({
			message: 'Joined.'
		});
	},

	getTop10: function(req, res){
		Player.query("SELECT steam_id, points, last_name FROM player ORDER BY points DESC LIMIT 0 , 10;", function (err, playerList){
			console.log(err);
			sails.log(err)
			return res.json(playerList);
		});
	}
};


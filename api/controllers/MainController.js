/**
 * PlayerController
 *
 * @description :: Server-side logic for managing Players
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	main: function(req, res){
		Player.query("SELECT steam_id, points, last_name FROM player ORDER BY points DESC LIMIT 0 , 10;", function (err, playerList){
			res.view("homepage.ejs", {playerList: playerList, error: false});
		});
	}
};


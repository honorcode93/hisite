/**
 * PlayerControllerController
 *
 * @description :: Server-side logic for managing Playercontrollers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var Q = require('q');

module.exports = {
	view: function(req, res){
		return res.view("player.ejs", {steam_id: req.param('id')});
	},
	
	getPlayer: function(req, res){
		var id = req.param('id');
		console.log(id);
		Player.findOne({steam_id: id}, function(error, player){
			console.log(player);
			console.log(error);
			return res.json(player);
		});
	},

	getSurvStats: function(req, res)
	{
		var id = req.param('id');
		console.log(id);
		Player_Survivor_Stats.findOne({steam_id: id}, function(error, stats){
			return res.json(stats);
		});
	},

	getDetStats: function(req, res)
	{
		var id = req.param('id');
		console.log(id);
		Player_Detective_Stats.findOne({steam_id: id}, function(error, stats){
			return res.json(stats);
		});
	},

	getInfStats: function(req, res)
	{
		var id = req.param('id');
		console.log(id);
		Player_Infected_Stats.findOne({steam_id: id}, function(error, stats){
			return res.json(stats);
		});
	},
};


/**
 * PlayerControllerController
 *
 * @description :: Server-side logic for managing Playercontrollers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

function mysql_real_escape_string (str) {
	if (typeof str != 'string')
		return str;

	return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
		switch (char) {
			case "\0":
				return "\\0";
			case "\x08":
				return "\\b";
			case "\x09":
				return "\\t";
			case "\x1a":
				return "\\z";
			case "\n":
				return "\\n";
			case "\r":
				return "\\r";
			case "\"":
			case "'":
			case "\\":
			case "%":
				return "\\"+char; // prepends a backslash to backslash, percent,
								  // and double/single quotes
		}
	});
}
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

	doSearch: function(req, res){
		var data = req.param('data');
		console.log(data);
		if(data == null)
			return res.notFound();


		data = data.trim();
		data = mysql_real_escape_string(data);
		var dataType = req.param('dataType', 'Guess input');

		var type = 'name';
		var guess = false;
		if(dataType == 'Guess input'){
			guess = true;
			if(/^(STEAM_[0-1]:)?([0-9]*:[0-9]*)$/.test(data)){
				data = data.replace('STEAM_1:', '');
				data = data.replace('STEAM_0:', '');
				type = 'steam_id'
			}
		}
		else if(dataType == 'Find by name')
			type = 'name'
		else if(dataType == 'Find by Steam ID')
			type = 'steam_id'
		else
			type = 'none'
		if(type == 'name'){
			Player.query("SELECT "+
							"rank, "+
							"last_name, "+
							"steam_id, "+
							"points, "+
							"karma, "+
							"last_active "+
						"FROM "+
							"(select @rownum:=@rownum+1 'rank', p.* from player p, (SELECT @rownum:=0) r order by points desc) v "+
						"WHERE last_name != '<no_name>' AND last_name LIKE '"+data+"%' COLLATE utf8_general_ci ORDER BY last_name LIMIT 50",function(err, result){
				return res.view('player_search.ejs', {result: result, error: false, guess: guess, type:'name'});
			});
		}
		else if(type == 'steam_id'){
			Player.query("SELECT "+
							"rank, "+
							"last_name, "+
							"steam_id, "+
							"points, "+
							"karma, "+
							"last_active "+
						"FROM "+
							"(select @rownum:=@rownum+1 'rank', p.* from player p, (SELECT @rownum:=0) r order by points desc) v "+
						"WHERE last_name != '<no_name>' AND steam_id LIKE '"+data+"%' COLLATE utf8_general_ci ORDER BY last_name LIMIT 50",function(err, result){
				return res.view('player_search.ejs', {result: result, error: false, guess: guess, type:'steam id'});
			});
		}
		else
			return res.notFound();
	},

	getPlayerRanking: function(req, res){
		var page;
		try{
			var page = parseInt(req.param('page'));
		}
		catch(e){
			console.log(e);
			return res.notFound();
		}
		if(typeof(page) === 'number')
		{
			Player.find({skip:20*(page-1), limit: 20, sort: 'points DESC'}, function(err, playerList){
				console.log(err);
				return res.json(playerList);
			});
		}
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


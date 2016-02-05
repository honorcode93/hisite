/**
 * AchievementControllerController
 *
 * @description :: Server-side logic for managing Achievementcontrollers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	main: function(req, res){
		return res.view("achievement.ejs");
	}
};


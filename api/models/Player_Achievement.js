/**
* PlayerAchievement.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	autoPK: false,
	autoCreatedAt: false,
	autoUpdatedAt: false,
	attributes: {
		steam_id: 'string',
		achievement_id: 'int',
		earned_on: 'datetime'
	}
};

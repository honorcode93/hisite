/**
* Player.js
*
* @description :: The main information of a player
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	autoPK: false,
	autoCreatedAt: false,
	autoUpdatedAt: false,
	attributes: {
		steam_id: {
			type: 'string',
			autoIncrement: true,
			primaryKey: true,
			required: true
		},
		last_name: 'string',
		last_active: 'datetime',
		karma: 'int',
		points: 'int',
		connection_time: 'int',
		rounds_played: 'int',
		rounds_infected: 'int',
		rounds_survivor: 'int',
		rounds_detective: 'int'
	}
};


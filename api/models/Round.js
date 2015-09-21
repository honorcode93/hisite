/**
* Round.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	autoPK: false,
	autoCreatedAt: false,
	autoUpdatedAt: false,
	attributes: {
		round_id: {
			type: 'int',
			autoIncrement: true,
			primaryKey: true,
			required: true
		},
		winner_team: 'int',
		max_inf_kill_streak: 'int',
		round_start: 'datetime',
		round_end: 'datetime'
	}
};


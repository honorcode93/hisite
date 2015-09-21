/**
* PlayerSurvivorStats.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
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
		surv_points: 'int',
		surv_kills: 'int',
		surv_headshots: 'int',
		surv_kill_streak: 'int',
		surv_deaths: 'int',
		surv_suicides: 'int',
		surv_teamkills: 'int',
		surv_min_alive_time: 'int',
		surv_rounds_won: 'int',
		surv_most_damage_taken: 'int',
		surv_most_damage_dealt: 'int',
		surv_hunters_shoved: 'int'
	}
};


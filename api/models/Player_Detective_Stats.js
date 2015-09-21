/**
* PlayerDetectiveStats.js
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
		det_points: 'int',
		det_kills: 'int',
		det_headshots: 'int',
		det_kill_streak: 'int',
		det_deaths: 'int',
		det_suicides: 'int',
		det_teamkills: 'int',
		det_min_alive_time: 'float',
		det_rounds_won: 'int',
		det_most_damage_taken: 'int',
		det_most_damage_dealt: 'int',
		det_hunters_shoved: 'int',
		det_credits_earned: 'int',
		det_credits_spent: 'int',
		det_infected_tased: 'int',
		det_bodies_scanned: 'int',
		det_c4_defused: 'int'
	}
};


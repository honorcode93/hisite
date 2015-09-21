/**
* PlayerInfectedStats.js
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
		inf_points: 'int',
		inf_kills: 'int',
		inf_headshots: 'int',
		inf_kill_streak: 'int',
		inf_deaths: 'int',
		inf_suicides: 'int',
		inf_teamkills: 'int',
		inf_min_alive_team: 'float',
		inf_rounds_won: 'int',
		inf_most_damage_taken: 'int',
		inf_most_damage_dealt: 'int',
		inf_credits_earned: 'int',
		inf_credits_spent: 'int',
		inf_c4_dropped: 'int',
		inf_c4_kills: 'int',
		inf_c4_kill_streak: 'int',
		inf_awp_kills: 'int',
		inf_awp_kill_streak: 'int',
		inf_mines_placed: 'int',
		inf_mine_kills: 'int',
		inf_mine_kill_streak: 'int',
		inf_barricades_destroyed: 'int',
		inf_indirect_ci_kills: 'int',
		inf_vests_used: 'int',
		inf_vest_kills: 'int',
		inf_vest_kill_streak: 'int',
		inf_bear_traps_placed: 'int',
		inf_bear_traps_worked: 'int',
		inf_bear_traps_kills: 'int',
		inf_sticky_bombs_placed: 'int',
		inf_sticky_bomb_kills: 'int',
		inf_invisible_kills: 'int'
	}
};


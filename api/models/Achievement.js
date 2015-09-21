/**
* Achievement.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	autoPK: false,
	autoCreatedAt: false,
	autoUpdatedAt: false,
	attributes: {
		achievement_id: {
			type: 'int',
			autoIncrement: true,
			primaryKey: true,
			required: true
		},
		name: 'string',
		description: 'string',
		hint: 'string',
		image_name: 'string',
		has_been_earned: 'int'
	}
};


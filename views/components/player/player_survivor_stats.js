/**
 * @jsx React.DOM
 */
'use strict';

function commaSeparateNumber(val){
	if(typeof val == 'undefined'){
		return val;
	}
	while (/(\d+)(\d{3})/.test(val.toString())){
    	val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
	}
	return val;
}

var React = require('react');

var PlayerSurvStats = React.createClass({
	getInitialState: function(){
		return {
			steam_id: this.props.steam_id,
			info: {
				surv_points: 0,
				surv_kills: 0,
				surv_headshots: 0,
				surv_kill_streak: 0,
				surv_deaths: 0,
				surv_suicides: 0,
				surv_teamkills: 0,
				surv_min_alive_time: 0.0,
				surv_rounds_won: 0,
				surv_most_damage_taken: 0,
				surv_most_damage_dealt: 0,
				surv_hunters_shoved: 0
			}
		};
	},
	componentDidMount: function(){
		$.get(this.props.source+this.props.steam_id, function(result) {
			console.log(result);
			this.setState({info: result});
	    }.bind(this));
	},
	render: function() {

		return(
			<div className="tab-pane active" id="panel-1">
				<ul className="stat-list">
					<li>Points earned as a survivor: {this.state.info.surv_points}</li>
					<li>Total kills: {this.state.info.surv_kills}</li>
					<li>Total headshot kills: {this.state.info.surv_headshots}</li>
					<li>Max kill streak (same round): {this.state.info.surv_kill_streak}</li>
					<li>Total deaths: {this.state.info.surv_deaths}</li>
					<li>Total suicides: {this.state.info.surv_suicides}</li>
					<li>Total teamkills: {this.state.info.surv_teamkills}</li>
					<li>Minimum alive time: {this.state.info.surv_min_alive_time}</li>
					<li>Rounds Won: {this.state.info.surv_rounds_won} (0.0%) </li>
					<li>Most damage taken: {this.state.info.surv_most_damage_taken}</li>
					<li>Most damage dealt: {this.state.info.surv_most_damage_dealt}</li>
					<li>Total hunters shoved: {this.state.info.surv_hunters_shoved}</li>
				</ul>
			</div>
		);
	}
});

module.exports = PlayerSurvStats;
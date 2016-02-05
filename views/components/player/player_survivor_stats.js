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
				<table className="table">
					<tr><th>Points earned as a survivor:</th><td> {this.state.info.surv_points}</td></tr>
					<tr><th>Total kills:</th><td> {this.state.info.surv_kills}</td></tr>
					<tr><th>Total headshot kills:</th><td> {this.state.info.surv_headshots}</td></tr>
					<tr><th>Max kill streak (same round):</th><td> {this.state.info.surv_kill_streak}</td></tr>
					<tr><th>Total deaths:</th><td> {this.state.info.surv_deaths}</td></tr>
					<tr><th>Total suicides:</th><td> {this.state.info.surv_suicides}</td></tr>
					<tr><th>Total teamkills:</th><td> {this.state.info.surv_teamkills}</td></tr>
					<tr><th>Minimum alive time:</th><td> {this.state.info.surv_min_alive_time}</td></tr>
					<tr><th>Rounds Won:</th><td> {this.state.info.surv_rounds_won} (0.0%)</td></tr>
					<tr><th>Most damage taken:</th><td> {this.state.info.surv_most_damage_taken}</td></tr>
					<tr><th>Most damage dealt:</th><td> {this.state.info.surv_most_damage_dealt}</td></tr>
					<tr><th>Total hunters shoved:</th><td> {this.state.info.surv_hunters_shoved}</td></tr>
				</table>
			</div>
		);
	}
});

module.exports = PlayerSurvStats;
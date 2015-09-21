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

var PlayerMainInfo = React.createClass({
	getInitialState: function(){
		return {
			steam_id: this.props.steam_id,
			info: {}
		};
	},
	componentDidMount: function(){
		$.get(this.props.source+this.props.steam_id, function(result) {
			console.log(this.state.info);
			this.setState({info: result});
	    }.bind(this));
	},
	render: function() {

		return(
			<div className="thumbnail">
				<img alt="Bootstrap Image Preview" src="http://lorempixel.com/140/140/" />
				<div className="caption">
					<h3>{this.state.info.last_name}</h3>
					<h5>Last active: {this.state.info.last_active}</h5>
					<ul>
						<li>Points: {commaSeparateNumber(this.state.info.points)}</li>
						<li>Karma: {commaSeparateNumber(this.state.info.karma)}</li>
						<li>Total connection time: {this.state.info.connection_time}</li>
						<li>Rounds Played: {commaSeparateNumber(this.state.info.rounds_played)}</li>
						<li>Rounds Infected: {commaSeparateNumber(this.state.info.rounds_infected)}</li>
						<li>Rounds Survivor: {commaSeparateNumber(this.state.info.rounds_survivor)}</li>
						<li>Rounds Detective: {commaSeparateNumber(this.state.info.rounds_detective)}</li>
					</ul>
					Infected Luck: {Math.round((this.state.info.rounds_infected/this.state.info.rounds_played*100.0)*100)/100} %
				</div>
			</div>
		);
	}
});

module.exports = PlayerMainInfo;
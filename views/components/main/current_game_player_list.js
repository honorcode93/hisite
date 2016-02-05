/**
 * @jsx React.DOM
 */
'use strict';
var React = require('react');

var CurrentGamePlayerList = React.createClass({
	render: function(){
		console.log(this.props.playerList);
		var players = this.props.playerList;

		if(players === undefined || players === null || players.length <= 0){
			return (
					<table className="table table-bordered table-condensed text-center player-list">
					</table>
			)
		}

		var list = players.map(function(p, index){
			return (
				<tr key={index}>
					<td  className={p.team+" "+p.state}>{p.name}</td>
				</tr>
			)
		});
		return (
			<table className="table table-bordered table-condensed text-center player-list">
				<tbody>
					{list}
				</tbody>
			</table>
		)
	}
});

module.exports = CurrentGamePlayerList;
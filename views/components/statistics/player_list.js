/**
 * @jsx React.DOM
 */
'use strict';   
var React = require('react');
var PlayerList = React.createClass({
	
	render:function(){
		var page = this.props.page;
		var players = this.props.playerList.map(function(p, index){
			return (
				<tr key={index}>
					<td>{index+1+20*(page-1)}</td>
					<td><a href={p.steam_id}></a>{p.last_name}</td>
					<td>{p.points}</td>
					<td>{p.karma}</td>
					<td>{p.last_active}</td>
				</tr>
			)
		});

		return (
			<table className="table table-condensed">
				<thead>
					<tr>
						<th>
							Rank
						</th>
						<th>
							Last seen name
						</th>
						<th>
							Points
						</th>
						<th>
							Karma
						</th>
						<th>
							Last Active
						</th>
					</tr>
				</thead>
				<tbody>
					{players}
				</tbody>
			</table>
		)
	}
});

module.exports = PlayerList;
/**
 * @jsx React.DOM
 */
'use strict';
var React = require('react');

var PlayerRanking = React.createClass({
	getInitialState: function(){
		return {
			info:[]
		};
	},
	componentDidMount: function(){
		$.get("/getTop10", function(result) {
			console.log(this.state.info);
			this.setState({info: result});
	    }.bind(this));
	},
	render: function() {
		var players = this.state.info.map(function (p, key) {
			var k = key + 1;
			return (
				<tr key={key}>
					<td>{k}</td>
					<td><a href={"/player/"+p.steam_id}>{p.last_name}</a></td>
					<td>{p.points}</td>
				</tr>
			)
		});
		
		if(players.length < 10)
		{
			for(var n = players.length; n < 10; n++){
				players.push(
						(
							<tr key={n}>
								<td>{n+1}</td>
								<td>-</td>
								<td>-</td>
							</tr>
						)
					);
			}
		}
	
		return (
			<table className="table table-condensed">
				<thead>
					<tr>
						<th className="text-center">Rank</th>
						<th className="text-center">Name</th>
						<th className="text-center">Points</th>
					</tr>
				</thead>
				<tbody className="text-center">
					{players}
				</tbody>
			</table> 
		);
	}
});
if(document.getElementById('homepage-player-ranking')){
	React.render(<PlayerRanking/>, document.getElementById('homepage-player-ranking'));
}
/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var PlayerMainInfo = require('./player_main_info');
var PlayerSurvStats = require('./player_survivor_stats');

var PlayerInfo = React.createClass({
	getInitialState: function(){
		return {
			steam_id: $("#player-info-app").attr("steam_id")
		};
	},
	render: function(){
		return (
			<div className="row">
				<div className="col-md-3">
					<PlayerMainInfo source="/getPlayer/" steam_id={this.state.steam_id}/>
				</div>
				<div className="col-md-9">
					<div className="panel panel-default">
						<div className="panel-heading">
							<h1 className="panel-title">
								<b>Statistics</b>
							</h1>
						</div>
						<div className="panel-body">
							<div className="tabbable player-stats-section" id="tabs-640957">
								<ul className="nav nav-tabs">
									<li className="active">
										<a href="#panel-1" data-toggle="tab">Survivor</a>
									</li>
									<li>
										<a href="#panel-2" data-toggle="tab">Detective</a>
									</li>
									<li>
										<a href="#panel-3" data-toggle="tab">Infected</a>
									</li>
									
								</ul>
								<div className="tab-content">
									<PlayerSurvStats source="/getSurvStats/" steam_id={this.state.steam_id} />
									<div className="tab-pane" id="panel-163367">
									</div>
								</div>
							</div>							
						</div>
					</div>
				</div>
			</div>
		);
	}
});

if(document.getElementById('player-info-app')){
	React.render(<PlayerInfo/>, document.getElementById('player-info-app'));
}

/*
<div class="row">
		<div class="col-md-3">
			<div class="thumbnail">
				<img alt="Bootstrap Image Preview" src="http://lorempixel.com/140/140/">
			</div>
		</div>
		<div class="col-md-9">
			<div class="panel panel-default">
				<div class="panel-heading">
					<h1 class="panel-title">
						<b>Statistics</b>
					</h1>
				</div>
				<div class="panel-body">
					<div class="tabbable player-stats-section" id="tabs-640957">
						<ul class="nav nav-tabs">
							<li class="active">
								<a href="#panel-304220" data-toggle="tab">Survivor</a>
							</li>
							<li>
								<a href="#panel-163367" data-toggle="tab">Detective</a>
							</li>
							<li>
								<a href="#panel-163367" data-toggle="tab">Infected</a>
							</li>
						</ul>
						<div class="tab-content">
							<div class="tab-pane active" id="panel-304220">
							</div>
							<div class="tab-pane" id="panel-163367">
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="panel panel-default">
				<div class="panel-heading">
					<h1 class="panel-title">
						<b>Achievements</b>
					</h1>
				</div>
				<div class="panel-body">
					<div class="media">
						 <a href="#" class="pull-left"><img alt="Bootstrap Media Preview" src="http://lorempixel.com/64/64/" class="media-object"></a>
						<div class="media-body">
							<h4 class="media-heading">
								Nested media heading
							</h4> Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.
							<div class="media">
								 <a href="#" class="pull-left"><img alt="Bootstrap Media Another Preview" src="http://lorempixel.com/64/64/" class="media-object"></a>
								<div class="media-body">
									<h4 class="media-heading">
										Nested media heading
									</h4> Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
*/
/**
 * @jsx React.DOM
 */
'use strict';
var React = require('react');
var CurrentGamePlayerList = require('./current_game_player_list');
var CurrentGameChat = require('./current_game_chat');

var CurrentGame = React.createClass({
	getInitialState: function(){
		return {
			
			serverState: null,
			chatMessages : [],
			playerList : [],
			timeLeft : 0,
			timingOut : false
			
			/*

			serverState: {
					round_stage_id : 3,
					round_stage : "In Progress",
					time_left : 60,
					winner : 0,
					map: "c1m1_hotel",
					current_round: 1,
					total_rounds: 5
	    	},
	    	chatMessages:[
	    		{time:'10:30:25', name:'Azure', content:'le lool'},
				{time:'10:30:54', name:'HonorCode', content:'c:'},
				{time:'10:31:25', name:'Jordan', content:'Are you serious'},
				{time:'10:31:55', name:'Kar', content:'KOSMARVLL'},
				{time:'10:31:55', name:'Marvel', content:'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk'},
				{time:'10:32:32', name:'Jost', content:'lol'},
				{time:'10:32:33', name:'Marvel', content:'lol'},
				{time:'10:33:36', name:'HonorCode', content:'zzzzz'},
				{time:'10:33:40', name:'Rivion', content:'rekt'}
	    	],
			playerList : [
					{name:"HonorCode", team:"infected", state:'player-dead'},
					{name:"Marvel", team:"detective", state:'player-dead'},
					{name:"Jost", team:"infected", state:'player-alive'},
					{name:"Rivion", team:"detective", state:'player-alive'},
					{name:"Nikki", team:"infected", state:'player-alive'},
					{name:"Stefeman", team:"unknown", state:'player-alive'},
					{name:"Kitties", team:"unknown", state:'player-dead'},
					{name:"kevin", team:"unknown", state:'player-dead'},
					{name:"poop", team:"unknown", state:'player-alive'},
					{name:"Azure", team:"unknown", state:'player-alive'},
					{name:"Bazure", team:"infected", state:'player-alive'},
					{name:"PsychoKitty", team:"unknown", state:'player-alive'}
			],
			
			timeLeft: 30,
			timingOut: false
			*/

		};
	},
	componentDidMount: function(){
		io.socket.get('/listen/hiserver', function(data){
			console.log("Listening to HI server.");
		});

		io.socket.on('chat-message', this.onChatMsg);
		io.socket.on('server-state', this.onServerState);

		io.socket.on('player-list', this.onPlayerList);
		setTimeout(this.timerTick, 1000);
	},
	timerTick: function(){
		if(!this.isMounted()){
			setTimeout(this.timerTick, 1000);
			return;
		}

		if(this.state === undefined || this.state.serverState === null){
			setTimeout(this.timerTick, 1000);
			return;
		}
		var time = this.state.timeLeft;
		var timingOut = this.state.timingOut;
		time -= 1;
		if(time == 0){
			if(!timingOut){
				time = 5;
				timingOut = true;
			}
			else{
				this.state.serverState = null;
				time = 0;
			}
		}
		if(time < 0){
			time = 0;
		}

		var state = this.state;
		this.setState({
			serverState: state.serverState, 
			chatMessages: state.chatMessages,
			playerList: state.playerList,
			timeLeft : time,
			timingOut: timingOut
		});
		setTimeout(this.timerTick, 1000);
	},
	onChatMsg: function(data){
		console.log(data);
		var messages = this.state.chatMessages;
		messages.push(data);
		this.setState({
			serverState: this.state.serverState, 
			chatMessages: messages,
			playerList: this.state.playerList,
			timeLeft : this.state.timeLeft,
			timingOut: this.state.timingOut
		});
	},
	onServerState: function(data){
		console.log(data);
		var state = this.state;
		var timeLeft = this.state.timeLeft;

		if(timeLeft == 0 || this.state.serverState.round_stage_id != data.round_stage_id)
			timeLeft = data.time_left;


		this.setState({
			serverState: data, 
			chatMessages: state.chatMessages,
			playerList: state.playerList,
			timeLeft : timeLeft,
			timingOut: false,
		});
	},
	onPlayerList: function(data){
		console.log(data);
		var state = this.state;
		this.setState({
			serverState: state.serverState, 
			chatMessages: state.chatMessages,
			playerList: data.players,
			timeLeft : state.timeLeft,
			timingOut: false,
		});

	},


	convertTime: function(timeSec){
		var minutes = Math.floor(timeSec / 60);
		var seconds = timeSec - minutes*60;

		var sMinutes = ""
		var sSeconds = ""

		if(minutes < 10){
			sMinutes = "0"+minutes.toString();
		}
		else{
			sMinutes = minutes.toString();
		}

		if(seconds < 10){
			sSeconds = "0"+seconds.toString();
		}
		else{
			sSeconds = seconds.toString();
		}

		return sMinutes+":"+sSeconds;

	},

	render: function(){
		if(this.state.serverState === null){
			return (
				<div className="current-game">
				<h1 className="server-offline">OFFLINE</h1>
				</div>
			)
		}
		var state = this.state.serverState;
		var time = this.convertTime(this.state.timeLeft);
		if(this.state.timingOut)
			time = "00:00";
		return (
			<div className="current-game">
				<div className="row">
					<div className="col-md-2"></div>
					<div className="col-md-8 text-center">
						<h2>{state.round_stage}</h2>
						<small>Round {state.current_round}/{state.total_rounds} </small>
						<h1>{time}</h1>
					</div>
					<div className="col-md-2"></div>
				</div>
				<div className="row">
					<div className="col-md-1"> </div>
					<div className="col-md-10">
						<button type="button" className="btn btn-block btn-default pull-right" data-toggle="collapse" data-target="#playerList" aria-expanded="false" aria-controls="playerList">
							<b>Player List</b>
						</button>
						<div className="collapse" id="playerList">
							<CurrentGamePlayerList playerList={this.state.playerList}/>
						</div>
					</div>
					<div className="col-md-1"> </div>
				</div>

				<div className="row">
				<div className="col-md-12">
					<div className="panel panel-default chat">
						<div className="panel-heading">
							Chat
						</div>
						<div className="panel-body" id="chat">
							<CurrentGameChat messages={this.state.chatMessages} />
						</div>
					</div> 
				</div>
				</div>
				<div className="row">
					<div className="col-md-8"></div>
					<div className="col-md-4">
						<button type="button" className="btn btn-primary btn-default pull-right">
							Connect
						</button>
					</div>
				</div>
			</div>
		)
	}
})

if(document.getElementById('homepage-current-game')){
	React.render(<CurrentGame/>, document.getElementById('homepage-current-game'));
}
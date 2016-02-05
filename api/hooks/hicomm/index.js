var net = require('net');

var PASSWORD = 'asd123'

//
//
//
//
//{round_stage_id : 3, round_stage : 'In Progress', time_left : 60, winner : 0, map: 'c1m1_hotel', current_round: 1, total_rounds: 5}

module.exports = function hicomm(sails) {
	sails.log("Initializing hidden infected communication hook")

	//Connected clients
	var clients = [];

	//Create the server
	var server = net.createServer(function(socket) {

		//Set this specific client's name
		socket.name = socket.remoteAddress + ":" + socket.remotePort;
		socket.state = 0

		sails.log(socket.name + "connected.");

		//Request password
	    socket.write('PASSWORD\n');

	    //When data is received...
	    socket.on('data', function(data){

	    	//If waiting for password
	    	if(socket.state == 0){

	    		//Trimg message
	    		msg = data.toString().trim()

	    		//Bad password.
	    		if(msg != PASSWORD){
	    			socket.write("PASSWORD_WRONG\n");
	    			socket.end()
	    		}

	    		//Good password
	    		else{
	    			socket.write("PASSWORD_OK\n");
	    			socket.state = 1
	    		}
	    	}

	    	//Already identified
	    	else if(socket.state == 1){

	    		//Remove \r
	    		info = data.toString().replace(/(\r||\r)/gm,"");

	    		//Split character. NOTE: Should be changed
	    		//to \n
	    		info = info.split(';')
	    		console.log(info);

	    		//This is a chat message
	    		if(info[0] == 'CHAT_MSG'){
	    			var s = info[1].toString().trim()
	    			var m;

	    			//Try to convert to JSON
	    			try{
	    				m = JSON.parse(s);
	    			}
	    			catch(e){
	    				socket.write('BAD_FORMAT\n');
	    				return;
	    			}
	    			socket.write('OK\n');
	    			sails.sockets.broadcast('hilisten', 'chat-message', m)
	    		}
	    		else if(info[0] == 'PLAYER_LIST'){
	    			var s = info[1].toString().trim()
	    			var m;

	    			//Try to convert to JSON
	    			try{
	    				m = JSON.parse(s);
	    			}
	    			catch(e){
	    				socket.write('BAD_FORMAT\n');
	    				return;
	    			}
	    			socket.write('OK\n');
	    			
	    			sails.sockets.broadcast('hilisten', 'player-list', m)
	    		}
	    		else if(info[0] == 'SERVER_STATE'){
	    			var s = info[1].toString().trim()
	    			var m;

	    			//Try to convert to JSON
	    			try{
	    				m = JSON.parse(s);
	    			}
	    			catch(e){
	    				socket.write('BAD_FORMAT\n');
	    				return;
	    			}
	    			socket.write('OK\n');
	    			sails.sockets.broadcast('hilisten', 'server-state', m)
	    		}
	    		else{
	    			socket.write('DONT_UNDERSTAND\n');
	    		}
	    	}
	    });

	    socket.on('end', function(){
	    	sails.log(socket.name + "disconnected.");
	    });
	});

	//Start listening...
	server.listen(30600);
	return {};
}
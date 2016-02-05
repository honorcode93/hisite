/**
 * @jsx React.DOM
 */
'use strict';
var React = require('react');

var CurrentGameChat = React.createClass({
	render: function(){

		var msgs = this.props.messages.map(function(m, index){
			return (
					<li>({m.time}) {m.name} : {m.content}</li>
				)
		});
		return (
			<ul className="chat-message-list">
				{msgs}
			</ul>
		)
	}
});

module.exports = CurrentGameChat;


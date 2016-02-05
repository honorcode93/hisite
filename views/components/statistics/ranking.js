/**
 * @jsx React.DOM
 */
'use strict';   
var React = require('react');
var PlayerList = require('./player_list');

var Ranking = React.createClass({
	getInitialState:function(){
		return {
			playerList: [],
			pages:[
				{page:1, current:true},
				{page:2, current:false},
				{page:3, current:false},
				{page:4, current:false},
				{page:5, current:false}
			]
		}
	},
	componentDidMount: function(){
		$.get('/getPlayerRanking/1', function(result) {
			this.setState({
				playerList: result,
				page: this.state.pages
			});
			console.log(result);
	    }.bind(this));
	},
	onPageNumberClicked:function(page){
		var clicked = page;
		var pages = this.state.pages;
		$.get('/getPlayerRanking/'+page, function(result) {
			for(var i = 0; i < pages.length; i++){
				pages[i].current = false;
			}
			if(page <= 0)
				return;
			if(page <= 2){
				for(var i = 0; i < pages.length; i++){
					pages[i].page = page-(page-1-i);
				}
				pages[page-1].current = true;
			}
			if(page >= 3){
				for(var i = 0; i < pages.length; i++){
					pages[i].page = page-(2-i);
				}
				pages[2].current = true;
			}

			this.setState({
				playerList: result,
				pages: pages
			});		
		}.bind(this));

	},
	onPrevClicked: function(event){
		var pages = this.state.pages;

		if(pages[0].current && pages[0].page == 1)
			return;

		var currPage;
		for(var i = 0; i < this.state.pages.length; i++){
			if(this.state.pages[i].current){
				currPage = this.state.pages[i].page
				break;
			}
		}
		var prev = currPage-1;
		$.get('/getPlayerRanking/'+prev, function(result) {
			if(currPage > 3){
				for(var i = 0; i < pages.length; i++){
					pages[i].page = pages[i].page - 1;
				}
			}
			else{
				pages[currPage-1].current = false;
				pages[currPage-2].current = true;
			}
			this.setState({
				playerList: result,
				pages: pages
			});
		}.bind(this));

	},
	onNextClicked: function(event){
		var pages = this.state.pages;
		var currPage;
		for(var i = 0; i < this.state.pages.length; i++){
			if(this.state.pages[i].current){
				currPage = this.state.pages[i].page
				break;
			}
		}
		var next = currPage+1
		$.get('/getPlayerRanking/'+next, function(result) {
			if(currPage >= 3){
				for(var i = 0; i < pages.length; i++){
					pages[i].page = pages[i].page + 1;
				}
			}
			else{
				pages[currPage].current = true;
				pages[currPage-1].current = false;
			}
			this.setState({
				playerList: result,
				pages: pages
			});
		}.bind(this));
	},
	render:function(){
		var currPage;
		for(var i = 0; i < this.state.pages.length; i++){
			if(this.state.pages[i].current){
				currPage = this.state.pages[i].page
				break;
			}
		}
		var thisHack = this;
		var pages = this.state.pages.map(function(p, index){
			if(p.current){
				return (
						<li className="active" key={index}>
							<a>{p.page}</a>
						</li>
				)
			}
			else{
				return (
						<li key={index}>
							<a onClick={thisHack.onPageNumberClicked.bind(null, p.page)}>{p.page}</a>
						</li>
				)
			}
		});

		var prev;
		if(this.state.pages[0].current && this.state.pages[0].page == 1){
			prev = (<li className="disabled">
						<a>Prev</a>
					</li>)
		}
		else{
			prev = (<li>
						<a onClick={this.onPrevClicked}>Prev</a>
				</li>)
		}
		return (
			<div>
				<div className="panel-heading">
					<h3 className="panel-title">
						<b>Player Ranking</b>
					</h3>
				</div>
				<div className="panel-body">
					<div>
						<PlayerList playerList={this.state.playerList} page={currPage}/>
					</div>
					<form role="form" action="player/search" method="post">
						<div className="form-group form-inline">
							<label htmlFor="searchForPlayer">
								Search player: 
							</label>
							<input name="data"  type="text" className="form-control" id="searchForPlayer" />
							<button type="submit" className="btn btn-primary">
								Find
							</button>
						</div>				
					</form>
				</div>
				<div className="panel-footer">
					<div className="row">
						<div className="col-md-3">
						</div>
						<div className="col-md-6">
							<ul className="pagination">
								{prev}
								{pages}
								<li>
									<a onClick={this.onNextClicked}>Next</a>
								</li>
							</ul>
						</div>
						<div className="col-md-3">
						</div>
					</div>
				</div>
			</div>
		)
	}
});

if(document.getElementById('stats-ranking')){
	React.render(<Ranking/>, document.getElementById('stats-ranking'));
}
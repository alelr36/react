var React = require('react'),
	Firebase = require('firebase');

LogShow = React.createClass ({

	 getInitialState: function () {
		this.entries = [];
			return {
				entries: []
			};
	},

	componentWillMount: function () {
		var firebaseRefs = new Firebase("http://mutombo-log.firebaseio.com/");

		firebaseRefs.on('child_added', function(data) {
			this.entries.push({
				id: data.key(),
				data: data.val()
			});
			this.setState({
				entries: this.entries
			});
		}.bind(this));
	},

	render: function () {
		return (
			<div className='button-container'>
				<input className='pretty-button' type='button' value='Logs' onClick={this.showLogTerminal}/>
				<div className='log-terminal hidden' id='logTerminal'>
					<ul className="logList">
						{this.renderLogs()}
					</ul>
				</div>
			</div>
		);
	},

	showLogTerminal: function () {
		var element = document.getElementById('logTerminal');
		var background = document.getElementById('background-overlay');
		if (!element.className.match('hidden')) {
			element.classList.add('hidden');
			element.classList.remove('animate');
			background.classList.add('hidden');
		} else {
			element.classList.remove('hidden');
			element.classList.add('animate');
			background.classList.remove('hidden');
		}

		this.props.fnReset();
		this.closeNewCard();
	},

	renderLogs: function () {
		var items = [];

		this.state.entries.forEach( function(logList) {
			items.push(<li key={logList.id}>  {logList.data.date} - | - {logList.data.entry} - | - Razon:  {logList.data.reason} - | - Movimiento:  {logList.data.type} </li>);
		});

		return items.reverse();
	},

	closeNewCard: function () {
		var element = document.getElementById('new-card-box');

		if (!element.className.match('hidden')) {
			element.classList.add('hidden');
		}
	}
});

module.exports = LogShow;
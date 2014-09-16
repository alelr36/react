var React = require('react'),
	Firebase = require('firebase');

	LogShow = React.createClass ({

		 getInitialState: function () {
	        this.entries = [];
		        return {
		            entries: []
		        }
		},

	    componentWillMount: function () {
	        this.firebaseRefs = new Firebase("https://mutombo-log.firebaseio.com/");

	        this.firebaseRefs.on('child_added', function(data) {
	            this.entries.push({
	                data: data.val()
	            });
	            this.setState({
	                entries: this.entries
	            });
	        }.bind(this));
	    },

		render: function () {
			var items = [];
	        
	        this.state.entries.forEach( function(logList) {
	            items.push(<li>{logList.data.date} - | - {logList.data.entry} - | - Razon:  {logList.data.reason} - | - Movimiento:  {logList.data.type} </li>);
	        });

			return (
				<div className='button-container'>
					<input className='pretty-button' type='button' value='Logs' onClick={this.showLogTerminal}/>
	                <div className='log-terminal hidden' id='logTerminal'>         
		                <ul className="logList">
		                	{items}					  
						</ul>           
	                </div>
                </div>
			)
		},

		showLogTerminal: function (e) {
	        var element = document.getElementById('logTerminal');
	        var background = document.getElementById('background-overlay');
	        if (!element.className.match('hidden')) {
	            element.classList.add('hidden');
	            element.classList.remove('animate');
	            background.classList.add('hidden');
	        }
	        else {
	            element.classList.remove('hidden');
	            element.classList.add('animate');
	            background.classList.remove('hidden');
	        }         

	        {this.props.fnReset()}
	        this.closeNewCard();  
    	},

    	closeNewCard: function () {
	        var element = document.getElementById('new-card-box');

	        if (!element.className.match('hidden')) {
	            element.classList.add('hidden');
	        }
    	}
	});

	module.exports = LogShow;
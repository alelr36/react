var React = require('react'),
	Firebase = require('firebase');

NewCard = React.createClass ({

	render: function () {
		return (
			<div className="card">
				<p> New Card </p>
				<input type="text" id="name" placeholder="Nombre"/>
				<br/>
				<input type="text" id="user" placeholder="Facebook username"/>
				<br/>
				<input type="button" value="Add" onClick={this.addCard}/>
			</div>
		)
	},

	addCard: function () {
		firebaseRefs = new Firebase("https://mutombo-cards.firebaseio.com/");

		firebaseRefs.push({
			name: document.getElementById("name").value,
			user: document.getElementById("user").value
		});
	}

});

module.exports = NewCard;

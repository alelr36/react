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
				<input type="text" id="cat" placeholder="Causa"/>
				<br/>
				<input className="button" type="button" value="Add" onClick={this.addCard}/>
			</div>
		)
	},

	addCard: function () {
		firebaseRefs = new Firebase("https://mutombo-cards.firebaseio.com/");

		firebaseRefs.push({
			name: document.getElementById("name").value,
			user: document.getElementById("user").value,
			cat: document.getElementById("cat").value,
			date: this.getDate()
		});
	},

	getDate: function () {
        var d = new Date();
        var curr_date = d.getDate();
        var curr_month = d.getMonth() + 1;
        var curr_year = d.getFullYear();
        var curr_hours = d.getHours();
        var curr_mins = d.getMinutes();

        return (curr_date + "/" + curr_month + "/" + curr_year + " - " + curr_hours + ":" + curr_mins + "hs");
    }
});

module.exports = NewCard;

var React = require('react'),
    Debt = require('../debt/debt'),
    Firebase = require('firebase');

var DebtColumn = React.createClass({
    getInitialState: function() {
        this.cards = [];
        return {cards: []};
    },

    componentWillMount: function() {
        this.firebaseRefs = new Firebase("https://radiant-inferno-3233.firebaseio.com/");
        
        this.firebaseRefs.on('child_added', function(data) {
            this.cards.push(data.val());
            this.setState({
                cards: this.cards
            });
        }.bind(this));

        this.firebaseRefs.on('child_removed', function(data) {            
            var lessCards = [];

            for (var i = 0; i < this.cards.length ; i++) {
                if (this.cards[i].user !== data.val().user) {
                    lessCards.push(this.cards[i]);
                }
            }

            this.setState({
                cards: lessCards
            });

        }.bind(this));              
    },

    render: function () {
        var rows = [];

        this.state.cards.forEach( function(debtList) {
            rows.push(<Debt className="card" user={debtList.user} name={debtList.name} />);
        });        

        return (
            <div className='debt-column'>{rows}</div>
        )
    }
});

module.exports = DebtColumn;
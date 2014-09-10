var React = require('react'),
    Debt = require('../debt/debt'),
    NewCard = require('../new-card/new-card'),
    Firebase = require('firebase');

var DebtColumn = React.createClass({
    getInitialState: function() {
        this.cards = [];
        return {cards: []};
    },

    componentWillMount: function() {
        this.firebaseRefs = new Firebase("https://mutombo-cards.firebaseio.com/");
        
        this.firebaseRefs.on('child_added', function(data) {
            this.cards.push({
                id: data.name(),
                data: data.val()
            });
            this.setState({
                cards: this.cards
            });
        }.bind(this));

        this.firebaseRefs.on('child_removed', function(data) {            
            var lessCards = [];

            for (var i = 0; i < this.cards.length ; i++) {
                if (this.cards[i].id !== data.name()) {
                    lessCards.push(this.cards[i]);
                }
            }

            this.cards = lessCards

            this.setState({
                cards: lessCards
            });

        }.bind(this));              
    },

    hideAllOverlays: function () {
        document.getElementById('background-overlay').classList.add('hidden');
        document.getElementById('new-card-box').classList.add('hidden');
        this.resetForm();
    },

    resetForm: function () {
        document.getElementById('usersSelect').selectedIndex = 0;
        document.getElementById('cat').selectedIndex = 0;
        document.getElementById('selectedImage').src = 'http://notsportscenter.com/wp-content/uploads/2014/03/MutomboWag.png';
    },

    render: function () {
        var rows = [];

        this.state.cards.forEach( function(debtList) {
            rows.push(<Debt 
                        className="card" 
                        cardId={debtList.id} 
                        user={debtList.data.user} 
                        name={debtList.data.name} 
                        cat={debtList.data.cat} 
                        date={debtList.data.date} />);
        });

        return (
            <div>
                <div id="background-overlay" className='hidden' onClick={this.hideAllOverlays}></div>
                <NewCard />
                <div className='debt-column'>{rows}</div>
            </div>
        )
    }
});

module.exports = DebtColumn;
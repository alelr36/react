var React = require('react'),
    Debt = require('../debt/debt'),
    NewCard = require('../new-card/new-card'),
    LogShow = require('../log-show/log-show'),
    Firebase = require('firebase');

var DebtContainer = React.createClass({
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
        document.getElementById('logTerminal').classList.add('hidden');
        this.resetForm();
    },

    resetForm: function () {
        document.getElementById('usersSelect').selectedIndex = 0;
        document.getElementById('cat').selectedIndex = 0;
        document.getElementById('selectedImage').src = '/assets/img/panched.gif';
        document.getElementById('otherReason').value = "";
        document.getElementById('otherReason').classList.add('hidden');
        document.getElementById('logTerminal').scrollTop = 0;
    },

    sortCards: function () {
        var array = this.state.cards;
        
        array.sort(function(obj1, obj2) {
            
            var dateA = obj1.data.date;
            var dateB = obj2.data.date;

            if (dateA < dateB) 
              return -1 
            if (dateA > dateB)
              return 1
        });
    },

    checkForEmptyData: function () {
        this.firebaseRefs = new Firebase("https://mutombo-cards.firebaseio.com/");

        this.firebaseRefs.on('value', function(data) {
            if (data) {
                document.body.classList.remove('loading');
            }
            if (!data.val()) {
                document.body.classList.add('no-sausage');
            } else {
                document.body.classList.remove('no-sausage');
            }
        }.bind(this));
    },

    render: function () {
        var rows = [];

        if (this.state.cards.length > 0) {
            this.sortCards();        

            this.state.cards.forEach( function(debtList) {
                rows.push(<Debt 
                            className="card" 
                            cardId={debtList.id} 
                            user={debtList.data.user} 
                            name={debtList.data.name} 
                            cat={debtList.data.cat} 
                            date={debtList.data.date} />);
            });
        }

        return (
            <div>
                <div id="background-overlay" className='hidden' onClick={this.hideAllOverlays}></div>
                    <NewCard fnReset={this.resetForm}/> <LogShow fnReset={this.resetForm}/>
                <div className='debt-container'>{rows}</div>
            </div>
        )
    },

    componentDidMount: function() {
        this.checkForEmptyData();
    }
});

module.exports = DebtContainer;
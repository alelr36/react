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

            this.checkForEmptyArray();
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

            this.checkForEmptyArray();
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
        document.getElementById('selectedImage').src = '/assets/img/MutomboWag.png';
        document.getElementById('otherReason').value = "";
        document.getElementById('otherReason').classList.add('hidden');
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

    checkForEmptyArray: function () {
        if (!this.state.cards.length > 0) {
            document.body.classList.add('sad-mutombo');
        }
        else {
            if (document.body.className.match('sad-mutombo')) {
                document.body.classList.remove('sad-mutombo');
            }
        }
    },

    render: function () {
        var rows = [];

        this.checkForEmptyArray();

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
    }
});

module.exports = DebtContainer;
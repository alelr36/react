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
        document.getElementById('selectedImage').src = 'http://notsportscenter.com/wp-content/uploads/2014/03/MutomboWag.png';
        document.getElementById('otherReason').value = "";
        document.getElementById('otherReason').classList.add('hidden');
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
                    <NewCard fnReset={this.resetForm}/> <LogShow fnReset={this.resetForm}/>
                <div className='debt-container'>{rows}</div>
            </div>
        )
    }
});

module.exports = DebtContainer;
var React = require('react'),
    Debt = require('../debt/debt'),
    NewCard = require('../new-card/new-card'),
    LogShow = require('../log-show/log-show'),
    Firebase = require('firebase'),
    Moment = require('moment');

var firebaseRef = new Firebase("http://mutombo-cards.firebaseio.com/");

var DebtContainer = React.createClass({

    getInitialState: function() {
        this.cards = [];
        return {cards: []};
    },

    componentWillMount: function() {

        firebaseRef.on('child_added', function(data) {
            this.cards.push({
                id: data.key(),
                data: data.val()
            });
            this.setState({
                cards: this.cards
            });

        }.bind(this));

        firebaseRef.on('child_removed', function(data) {
            var lessCards = [];

            for (var i = 0; i < this.cards.length ; i++) {
                if (this.cards[i].id !== data.key()) {
                    lessCards.push(this.cards[i]);
                }
            }

            this.cards = lessCards;

            this.setState({
                cards: lessCards
            });

        }.bind(this));

    },

    render: function () {
        return (
            <div>
                <div id='background-overlay' className='background-overlay hidden' onClick={this.hideAllOverlays}></div>
                    <NewCard fnReset={this.resetForm}/>
                    <LogShow fnReset={this.resetForm}/>
                <div className='debt-container'>
                    {this.renderRows()}
                </div>
            </div>
        );
    },

    renderRows: function () {
        var rows = [];

        if (this.state.cards.length > 0) {
            this.sortCards();

            this.state.cards.forEach( function(debtList) {
                rows.push(<Debt
                    key={debtList.id}
                    className="card"
                    cardId={debtList.id}
                    user={debtList.data.user}
                    name={debtList.data.name}
                    cat={debtList.data.cat}
                    date={debtList.data.date} />);
            });
        }

        return rows;
    },

    sortCards: function () {
        var array = this.state.cards;

        array.sort(function(obj1, obj2) {
            var dateA = obj1.data.date;
            var dateB = obj2.data.date;

            if (Moment(dateB).isAfter(dateA)){
                return -1;
            } else {
                return 1;
            }
        });
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

    componentDidMount: function() {
        this.checkForEmptyData();
    },

    checkForEmptyData: function () {

        firebaseRef.on('value', function(data) {
            if (data) {
                document.body.classList.remove('loading');
            }
            if (!data.val()) {
                document.body.classList.add('no-sausage');
            } else {
                document.body.classList.remove('no-sausage');
            }
        }.bind(this));
    }
});

module.exports = DebtContainer;
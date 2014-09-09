var React = require('react'),
    Moment = require('moment');

var Debt = React.createClass({
    propTypes:{
        name: React.PropTypes.string.isRequired,
        cat: React.PropTypes.string,
        user: React.PropTypes.string
    },

    getDefaultProps : function () {
        return {
            cat: 'Mutombo'
        }
    },

    render : function () {
        var cardDate = Moment(this.props.date).format('M');
        var now = Moment(Date.now()).format('M');
        var classes = 'card';

        if(cardDate < now-12) {
            classes = 'card really-red-card';
        }
        else {
            if(cardDate < now-7) {
                classes = 'card red-card';
            }
        }

        return (
                <div className={classes}>
                <img className="pic" src={this.getUser()}/>
                    <div className='debt-data'>
                        <p>{this.props.name}</p>
                        <p>Razon: {this.props.cat}</p>
                        <p>Fecha: {this.props.date} </p>
                        <input type='button' value='Pagau' onClick={this.deleteCard} />
                    </div>
                </div>
        );
    }, 

    getUser: function () {
        return (
                'https://graph.facebook.com/' + this.props.user + '/picture?width=150&height=150' 
        )
    },    

    deleteCard: function() {
        var fredRef = new Firebase('https://mutombo-cards.firebaseio.com/' + this.props.cardId);
        
        if (confirm("Vas a borrar una card, are you sure?")) { 
            fredRef.remove();
        }       
    }
});

module.exports = Debt;
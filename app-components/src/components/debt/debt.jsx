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
        var sevenDays = Moment(Moment().subtract('days', 7)).format('MM/DD/YYYY');
        var twelveDays = Moment(Moment().subtract('days', 12)).format('MM/DD/YYYY');
        
        var classes = '';

        if(this.props.date < twelveDays) {
            classes += ' red-card';
        }
        else {
            if(this.props.date < sevenDays) {
                classes += ' yellow-card';
            }
        }

        return (
                <div className='card'>
                    <img className={classes +' pic'} src={this.getUser()}/>
                    <div className='debt-data'>
                        <p>{this.props.name}</p>
                        <p>Razon: {this.props.cat}</p>
                        <p>Fecha: {Moment(this.props.date).format('DD-MM-YYYY - HH:mm')} </p>
                        <input type='button' value='Paid' onClick={this.deleteCard} />
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
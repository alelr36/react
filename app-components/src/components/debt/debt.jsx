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
        var sevenDays = Moment(Moment().subtract(7, 'days')).format('MM/DD/YYYY');
        var twelveDays = Moment(Moment().subtract(12, 'days')).format('MM/DD/YYYY');
        
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
                        <p>{this.props.cat}</p>
                        <p>Fecha: {Moment(this.props.date).format('DD-MM-YYYY - HH:mm')} </p>
                        <input className='clouds-flat-button' type='button' value='Paid' onClick={this.deleteCard} />
                    </div>
                </div>
        );
    }, 

    getUser: function () {
        var userpicture = 'http://notsportscenter.com/wp-content/uploads/2014/03/MutomboWag.png';

        if (!(this.props.user === "")) {
            userpicture = 'https://graph.facebook.com/' + this.props.user + '/picture?width=150&height=150';
        }
        return (
               userpicture  
        )
    },    

    deleteCard: function() {
        var fredRef = new Firebase('https://mutombo-cards.firebaseio.com/' + this.props.cardId);
        
        if (confirm('Seguro que esto ya está pagado?')) { 
            fredRef.remove();
            this.logDelete();
        }       

    },

    logDelete: function () {
        firebaseLogRefs = new Firebase('https://mutombo-log.firebaseio.com/');

        firebaseLogRefs.push({
            type: "Removing card",
            entry: "Victima: " + this.props.name,
            reason: this.props.cat,
            date: Moment().format('DD/MM/YYYY, HH:mm')
        });
    }
});

module.exports = Debt;
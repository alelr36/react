var React = require('react/addons'),
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

    getPicClasses: function () {
        var twoWeeks = Moment(Moment().subtract(2, 'weeks')).format('MM/DD/YYYY');
        var threeWeeks = Moment(Moment().subtract(3, 'weeks')).format('MM/DD/YYYY');
        var fourWeeks = Moment(Moment().subtract(4, 'weeks')).format('MM/DD/YYYY');
        var fiveWeeks = Moment(Moment().subtract(5, 'weeks')).format('MM/DD/YYYY');
        var date = this.props.date;
        var cx = React.addons.classSet;

        return cx({
            'pic': true,
            'mild--red-card': date < twoWeeks && date > threeWeeks,
            'red-card': (date < threeWeeks && date > fourWeeks) || date < fiveWeeks,
            'red-glowing-card': date < fourWeeks && date > fiveWeeks
        });
    },

    getHiddenSealClasses: function () {
        var fiveWeeks = Moment(Moment().subtract(5, 'weeks')).format('MM/DD/YYYY');
        var cx = React.addons.classSet;

        return cx({
            'hidden': this.props.date > fiveWeeks,
            'double-penalty': this.props.date < fiveWeeks
        });
    },

    render : function () {
        return (
                <div className='card'>
                    <img className={this.getPicClasses()} src={this.getUser()}/>
                    <img className={this.getHiddenSealClasses()} src='/assets/img/x2.png'/>
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
        var userpicture = '/assets/img/MutomboWag.png';

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
            date: Moment().zone('-03:00').format('DD/MM/YYYY, HH:mm')
        });
    }
});

module.exports = Debt;
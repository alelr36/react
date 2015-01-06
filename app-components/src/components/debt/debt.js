var React = require('react/addons'),
    Moment = require('moment'),
    Firebase = require('firebase'),
    cx = React.addons.classSet;

var Debt = React.createClass({

    render : function () {
        return (
            <div className='card'>
                <img className={this.getPicClasses()} src={this.getUser()}/>
                <img className={this.getHiddenSealClasses()} src='/assets/img/x2.png'/>
                {this.renderCardData()}
            </div>
        );
    },

    renderCardData: function () {
        return (
            <div className='debt-data'>
                <p>{this.props.name}</p>
                <p>{this.props.cat}</p>
                <p>Fecha: {Moment(this.props.date, 'MM/DD/YYYY - HH:mm').format('DD-MM-YYYY - HH:mm')} </p>
                <input className='clouds-flat-button' type='button' value='Pagado' onClick={this.deleteCard} />
            </div>
        );
    },

    getPicClasses: function () {
        var twoWeeks = Moment().subtract(2, 'weeks').format('MM/DD/YYYY');
        var threeWeeks = Moment().subtract(3, 'weeks').format('MM/DD/YYYY');
        var fourWeeks = Moment().subtract(4, 'weeks').format('MM/DD/YYYY');
        var date = this.props.date;

        return cx({
            'pic': true,
            'mild--red-card': Moment(date, 'MM/DD/YYYY').isBefore(twoWeeks) && Moment(date, 'MM/DD/YYYY').isAfter(threeWeeks),
            'red-card': Moment(date, 'MM/DD/YYYY').isBefore(threeWeeks) && Moment(date, 'MM/DD/YYYY').isAfter(fourWeeks),
            'red-glowing-card': Moment(date, 'MM/DD/YYYY').isBefore(fourWeeks)
        });
    },

    getHiddenSealClasses: function () {
        var fiveWeeks = Moment().subtract(5, 'weeks').format('MM/DD/YYYY');
        var date = this.props.date;

        return cx({
            'hidden': Moment(date, 'MM/DD/YYYY').isAfter(fiveWeeks),
            'double-penalty': Moment(date, 'MM/DD/YYYY').isBefore(fiveWeeks)
        });
    },

    getUser: function () {
        var userPicture = '/assets/img/panched.gif';

        if (this.props.user) {
            userPicture = 'https://graph.facebook.com/' + this.props.user + '/picture?width=150&height=150';
        }

        return userPicture;
    },    

    deleteCard: function() {
        var firebaseCardsRef = new Firebase('http://mutombo-cards.firebaseio.com/' + this.props.cardId);

        var pr =  prompt('Razon para borrar la card? (Pagado, Error en los datos, etc)', 'Pagado');

        if (pr) {
            firebaseCardsRef.remove();
            this.logDeletion(pr);
        }
    },

    logDeletion: function (pr) {
        var firebaseLogRefs = new Firebase('http://mutombo-log.firebaseio.com/');

        if (pr.length > 30) {
            pr = pr.substring(0, 20);
            pr += "...";
        }

        firebaseLogRefs.push({
            type: "Removing card (" + pr + ")",
            entry: "Victima: " + this.props.name,
            reason: this.props.cat,
            date: Moment().zone('-03:00').format('DD/MM/YYYY, HH:mm')
        });
    }
});

module.exports = Debt;
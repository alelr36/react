var React = require('react/addons'),
    Moment = require('moment'),
    Firebase = require('firebase'),
    classNames = require('classnames');

var Debt = React.createClass({

    render: function () {
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
                <p className='card-item'>{this.props.name}</p>
                <p className='card-item'>{this.props.cat}</p>
                <p className='card-item'>Fecha: {Moment(this.props.date, 'MM/DD/YYYY - HH:mm').format('DD-MM-YYYY - HH:mm')} </p>
                <input className='clouds-flat-button' type='button' value='Pagado' onClick={this.deleteCard} />
            </div>
        );
    },

    getPicClasses: function () {
        var twoWeeks = Moment().subtract(2, 'weeks').format('MM/DD/YYYY');
        var threeWeeks = Moment().subtract(3, 'weeks').format('MM/DD/YYYY');
        var fourWeeks = Moment().subtract(4, 'weeks').format('MM/DD/YYYY');
        var date = this.props.date;

        return classNames({
            'pic': true,
            'mild-red-card': this.getDateRange(date, twoWeeks, threeWeeks, 'between'),
            'red-card': this.getDateRange(date, threeWeeks, fourWeeks, 'between'),
            'red-glowing-card': this.getDateRange(date, fourWeeks, null, 'before')
        });
    },

    getHiddenSealClasses: function () {
        var fiveWeeks = Moment().subtract(5, 'weeks').format('MM/DD/YYYY');
        var date = this.props.date;

        return classNames({
            'hidden': this.getDateRange(date, fiveWeeks, null, 'after'),
            'double-penalty': Moment(date, 'MM/DD/YYYY').isBefore(fiveWeeks)
        });
    },

    getDateRange: function (date, start, end, period) {
        if (period === 'between') {
            return Moment(date, 'MM/DD/YYYY').isBetween(end, start) ||
                Moment(date, 'MM/DD/YYYY').isSame(start);
        } else if (period === 'before') {
            return Moment(date, 'MM/DD/YYYY').isBefore(start) ||
                Moment(date, 'MM/DD/YYYY').isSame(start);
        } else {
            return Moment(date, 'MM/DD/YYYY').isAfter(start) ||
                Moment(date, 'MM/DD/YYYY').isSame(start);
        }
    },

    getUser: function () {
        return this.props.user || '/assets/img/panched.gif';
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
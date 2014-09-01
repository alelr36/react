var React = require('react'),
    Debt = require('../debt/debt');

var DebtColumn = React.createClass({

    render: function () {
        return (
                <div className='debt-column'>
                    <Debt name='Javi' user='kavi089'/>
                    <Debt name='Feo' user='nicolas.siandro' />
                    <Debt name='Turco' user='turco.remedi' />
                    <Debt name='Ale' user='ale.arce.lr'/>
                    <Debt name='Soler' user='martosoler'/>
                    <Debt name='David' user='Dave.Fuentes' />
                    <Debt name='Mema' user='hernan.seghetti' />
                    <Debt name='Maxi' user='charca'/>
                </div>
        );
    }
});

module.exports = DebtColumn;
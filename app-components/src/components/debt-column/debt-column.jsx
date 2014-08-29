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
                </div>
        );
    }
});

module.exports = DebtColumn;
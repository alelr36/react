var React = require('react'),
    Debt = require('../debt/debt');

var DebtColumn = React.createClass({

    render: function () {
        var rows = [];

        this.props.debtList.forEach( function(debtList) {
            rows.push(<Debt className="card" user={debtList.user} name={debtList.name} />);
        });        

        return (
            <div className='debt-column'>{rows}</div>
        )
    }
});

module.exports = DebtColumn;
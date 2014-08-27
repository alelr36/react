var React = require('react'),
    ReactDisplay = require('components/react-mixins/swa-react-display');

module.exports = React.createClass({

    render: function () {
        return (
            <div className='debt-column'>
                <Debt name='Javi' />
                <Debt name='Feo' />
                <Debt name='Turco' />
            </div>
        );
    }
});
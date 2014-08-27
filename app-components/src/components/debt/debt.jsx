var React = require('react'),
    ReactDisplay = require('components/react-mixins/swa-react-display');

module.exports = React.createClass({
    propTypes:{
        name: React.PropTypes.string.isRequired,
        cat: React.PropTypes.string
    },

    getDefaultProps: function () {
        return {
            cat: 'Mutmobo'
        }
    },

    render: function () {
        return (
            <div className='card'>
                <img src='http://facebook.github.io/react/img/logo_small.png'/>
                <div className='debt-data'>
                    <p>{this.props.name}</p>
                    <p>{this.props.cat}</p>
                    <input enabled='false' type='date' value='2013-01-08' />
                </div>
            </div>
        );
    }
});
var React = require('react');

var Debt = React.createClass({
    propTypes:{
        name: React.PropTypes.string.isRequired,
        cat: React.PropTypes.string,
        user: React.PropTypes.string
    },

    getDefaultProps: function () {
        return {
            cat: 'Mutombo'
        }
    },

    render: function () {
        return (
                <div className='card'>
                <img src={this.getUser()}/>
                    <div className='debt-data'>
                        <p>{this.props.name}</p>
                        <p>{this.props.cat}</p>
                        <input enabled='false' type='date' value='2013-01-08' />
                    </div>
                </div>
        );
    },

    getUser:function() {
        return (
                'https://graph.facebook.com/' + this.props.user + '/picture?width=200&height=200' 
        )
    }
});

module.exports = Debt;
var React = require('react');

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
        return (
                <div className='card'>
                <img className="pic" src={this.getUser()}/>
                    <div className='debt-data'>
                        <p>{this.props.name}</p>
                        <p>{this.props.cat}</p>
                        <p>ID: {this.createId}</p>
                        <input enabled='false' type='date' value='2013-01-08' />
                        <input type='button' value='Pagó' />
                    </div>
                </div>
        );
    },    

    getUser: function () {
        return (
                'https://graph.facebook.com/' + this.props.user + '/picture?width=150&height=150' 
        )
    },

    createId: function() {
        var d = new Date();
        var n = d.getTime();
        alert(n);
    }    
});

module.exports = Debt;
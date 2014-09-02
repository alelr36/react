/*** @jsx React.DOM */

var React = require('react'),
	DebtColumn = require('../target/components/debt-column/debt-column'),
    json = require('./components/cards.json');    

React.renderComponent(<DebtColumn className='debt-column' debtList={json} />, document.body);
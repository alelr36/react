/*** @jsx React.DOM */

var React = require('react'),
	DebtContainer = require('../target/components/debt-container/debt-container');    

React.renderComponent(<DebtContainer className='debt-container'/>, document.body);
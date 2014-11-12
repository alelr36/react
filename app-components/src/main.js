/*** @jsx React.DOM */

var React = require('react'),
	DebtContainer = require('../target/components/debt-container/debt-container');    

React.render(<DebtContainer className='debt-container'/>, document.body);
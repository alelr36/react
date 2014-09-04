/*** @jsx React.DOM */

var React = require('react'),
	DebtColumn = require('../target/components/debt-column/debt-column');    

React.renderComponent(<DebtColumn className='debt-column'/>, document.body);
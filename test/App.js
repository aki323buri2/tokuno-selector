import './App.scss';
import React from 'react';
import { connect } from 'react-redux';
@connect(state => state)
export default class App extends React.Component
{
	render()
	{
		return (
			<div className="app">
				appp
			</div>
		);
	}
};
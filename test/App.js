import './App.scss';
import React from 'react';
import { connect } from 'react-redux';
@connect(state => state)
export default class App extends React.Component
{
	action(type, payload) 
	{
		return this.props.dispatch({ type, payload });
	}
	render()
	{
		return (
			<div className="app">
				あっぷ
			</div>
		);
	}
};
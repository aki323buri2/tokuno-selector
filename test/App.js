import './App.scss';
import React from 'react';
import { connect } from 'react-redux';
import Starter from '../lib/Starter';
@connect(state => state)
export default class App extends React.Component
{
	action(type, payload) 
	{
		return this.props.dispatch({ type, payload });
	}
	render()
	{
		const { starter } = this.props;
		return (
			<div className="app">
				
				<div className="field">
					<div className="field-title">すたあたあ : </div>
					<div className="field-body">
						<Starter
							value={starter}
							onChange={value => this.action('TEST', value)}
						/>
					</div>
				</div>
			</div>
		);
	}
};
import './App.scss';
import React from 'react';
import { connect } from 'react-redux';
import TokunoSelector from '../lib/TokunoSelector';
@connect(state => state)
export default class App extends React.Component
{
	action(type, payload) 
	{
		return this.props.dispatch({ type, payload });
	}
	render()
	{
		const { tmasaPending, tmasa, tokuno } = this.props;
		const suffix = 910;
		return (
			<div className="app content is-small">
				
				<div className="field">
					<div className="field-title">とくのおせれくたあ : </div>
					<div className="field-body">
						<TokunoSelector
							tokuno={tokuno}
							tmasa={tmasa[suffix]}
							tmasaPending={tmasaPending}
							onChange={value => this.action('TOKUNO', value)}
						/>
					</div>
				</div>
			</div>
		);
	}
};
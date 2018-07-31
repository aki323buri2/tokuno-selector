import './TokunoSelector.scss';
import React from 'react';
import TokunoInput from './TokunoInput';
import Suggestions from './Suggestions';
export default class TokunoSelector extends React.Component
{
	static defaultProps = {
		tmasa: [], 
		tokuno: [], 
		onChange: tokuno => {}, 
	};
	state = {
		tokuno: null, 
	};
	render()
	{
		const { tmasa, syozok } = this.props;
		const { tokuno } = this.state;
		const dict = tmasa.reduce((acc, tmasa) =>
		{
			const { tokuno, ryakun } = tmasa;
			acc[tokuno] = ryakun;
			return acc;
		}, {});
		return (
			<div className="tokuno-selector">
				
				<TokunoInput
					tokuno={tokuno}
					dict={dict}
					onChange={tokuno => this.tokunoInputChange(tokuno)}
				/>

				<Suggestions
					dict={dict}
					tokuno={tokuno}
				/>

			</div>
		);
	}
	tokunoInputChange = tokuno =>
	{
		this.setState({ tokuno });
	}
};
import './TokunoSelector.scss';
import React from 'react';
import TokunoInput from './TokunoInput';
import QueryInput from './QueryInput';
import Suggestions from './Suggestions';
import classnames from 'classnames';
import keycodes from 'keycodes';
export default class TokunoSelector extends React.Component
{
	static defaultProps = {
		tmasa: [], 
		tokuno: [], 
		query: '', 
		onChange: tokuno => {}, 
	};
	state = {
		tokuno: null, 
		highlighted: -1, 
		query: '', 
		menuActive: true, 
	};
	render()
	{
		const { tmasa } = this.props;
		const { tokuno, highlighted, query } = this.state;
		const { menuActive } = this.state;
		const dict = tmasa.reduce((acc, tmasa) =>
		{
			const { tokuno, ryakun } = tmasa;
			acc[tokuno] = ryakun;
			return acc;
		}, {});

		return (
			<div className="tokuno-selector">
				
				<TokunoInput
					ref={ref => this.tokunoInput = ref}
					tokuno={tokuno}
					dict={dict}
					onChange={tokuno => this.tokunoInputChange(tokuno)}
					onKeyDown={this.inputKeydown}
				/>

				<div className={classnames('menu', { active: menuActive })}>
					<QueryInput
						query={query}
						onChange={this.queryInputChange}
						onKeyDown={this.inputKeydown}
					/>

					<Suggestions
						ref={ref => this.suggestions = ref}
						tmasa={tmasa}
						tokuno={tokuno}
						query={query}
						highlighted={highlighted}
						onClick={this.suggestionsClick}
					/>
				</div>

			</div>
		);
	}
	tokunoInputChange = tokuno =>
	{
		this.setState({ tokuno });
	}
	queryInputChange = query =>
	{
		this.setState({ query });
	}
	inputKeydown = e =>
	{
		const cancel = e => 
		{
			e.preventDefault();
			e.stopPropagation();
		};
		const key = keycodes(e.keyCode);
		if ([ 'up', 'down' ].includes(key))
		{
			cancel(e);
			this.updown(key);
		}
		if ([ 'enter' ].includes(key))
		{
			this.enterValue();
		}
	}
	updown(key)
	{
		let delta = key === 'up' ? -1 : 1;
		let { highlighted } = this.state;
		const suggestions = this.suggestions;
		const filtered = suggestions.getFiltered();
		const display = suggestions.getDisplay();
		const offset = suggestions.getOffset();
		const limit = suggestions.getLimit();
		highlighted += delta;
		if (highlighted < 0) 
		{
			if (offset === 0)
			{
				highlighted = 0;
			}
			else
			{
				suggestions.setOffset(offset - 1);
				highlighted = 0;
			}
		}
		else if (highlighted > display.length - 1)
		{
			if (offset + limit === filtered.length - 1)
			{
				highlighted = display.length - 1;
			}
			else
			{
				suggestions.setOffset(offset + 1);
				highlighted -= 1;
			}
		}
		this.setState({ highlighted });
	}
	enterValue()
	{
		const { highlighted } = this.state;
		const tokuno = this.suggestions.tokunoByIndex(highlighted);
		if (tokuno === null) return;

		this.setState({ tokuno });		
	}
	suggestionsClick = (index, tokuno) =>
	{
		this.setState({ tokuno });
	}
};
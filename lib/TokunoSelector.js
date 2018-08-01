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
		query: '', 
		menuActive: false, 
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
						onClick={this.suggestionsClick}
					/>
				</div>

			</div>
		);
	}
	componentDidMount()
	{
		this.tokunoInput.barsIcon.on('click', this.tokunoInputBarsIconClick);
	}
	componentWillUnmount()
	{
		this.tokunoInput.barsIcon.off('click', this.tokunoInputBarsIconClick);
	}
	tokunoInputBarsIconClick = e =>
	{
		this.showMenu();
	}
	showMenu()
	{
		this.setState({ menuActive: true });
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
		this.suggestions.updownHighlighted(key);
	}
	enterValue()
	{
		const tokuno = this.suggestions.getHightlightedTokuno();
		if (tokuno === null) return;

		this.setState({ tokuno });		
	}
	suggestionsClick = (index, tokuno) =>
	{
		this.setState({ tokuno });
	}
};
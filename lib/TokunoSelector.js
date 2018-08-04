import './TokunoSelector.scss';
import React from 'react';
import Popmenu from './Popmenu';
import TokunoInput from './TokunoInput';
import QueryInput from './QueryInput';
import Suggestions from './Suggestions';
import UsedTokuno from './UsedTokuno';
import LoadingOverlay from 'loading-overlay';
import classnames from 'classnames';
import keycodes from 'keycodes';
export default class TokunoSelector extends React.Component
{
	static defaultProps = {
		tmasa: [], 
		tokuno: [], 
		query: '', 
		onChange: tokuno => {}, 
		tmasaPending: false, 
	};
	state = {
		tokuno: null, 
		query: '', 
		showMenu: true, 
		showPopmenu: false, 
		showUsed: false, 
	};
	
	render()
	{
		const { tmasaPending, tmasa } = this.props;
		const { tokuno, highlighted, query } = this.state;
		const { showMenu, showPopmenu, showUsed } = this.state;
		const dict = tmasa.reduce((acc, tmasa) =>
		{
			const { tokuno, ryakun } = tmasa;
			acc[tokuno] = ryakun;
			return acc;
		}, {});

		return (
			<div className="tokuno-selector">
				
				<TokunoInput
					ref={e => this.tokunoInput = e}
					tokuno={tokuno}
					dict={dict}
					onChange={tokuno => this.tokunoInputChange(tokuno)}
					onKeyDown={this.inputKeydown}
				/>
				
				<Popmenu
					ref={e => this.popmenu = e}
					active={showPopmenu}
				/>

				<div className={classnames('menu', { active: showMenu })}>
					
					<CloseButton onClick={this.menuClose}/>

					<QueryInput
						query={query}
						onChange={this.queryInputChange}
						onKeyDown={this.inputKeydown}
					/>

					<Suggestions
						ref={e => this.suggestions = e}
						tmasa={tmasa}
						tokuno={tokuno}
						query={query}
						onClick={this.suggestionsClick}
					/>

					<LoadingOverlay
						className="loading"
						active={tmasaPending}
						text="得意先マスタを読み込んでいます..."
					/>
				</div>

				<UsedTokuno
					active={showUsed}
					ref={e => this.usedTokuno = e}
					selectedTokuno={tokuno}
					onChange={this.usedTokunoChange}
					closeClick={e => this.hideUsed()}
				/>

			</div>
		);
	}
	componentDidMount()
	{
		this.tokunoInput.barsIcon.on('click', this.tokunoInputBarsIconClick);
		this.tokunoInput.buildingIcon.on('click', this.tokunoInputBuildingIconClick);
		this.popmenu.search.dom.on('click', this.popmenuSearchClick);
		this.popmenu.used.dom.on('click', this.popmenuUsedClick);
	}
	componentWillUnmount()
	{
		this.tokunoInput.barsIcon.off('click', this.tokunoInputBarsIconClick);
		this.tokunoInput.buildingIcon.off('click', this.tokunoInputBuildingIconClick);
		this.popmenu.search.dom.off('click', this.popmenuSearchClick);
		this.popmenu.used.dom.off('click', this.popmenuUsedClick);
	}
	tokunoInputBuildingIconClick = e =>
	{
		this.togglePopmenu();
	}
	tokunoInputBarsIconClick = e =>
	{
		this.toggleMenu();
	}
	popMenuIsActive()
	{
		return this.state.showPopmenu;
	}
	menuIsActive()
	{
		return this.state.showMenu;
	}
	showPopmenu(show = true)
	{
		this.setState({ showPopmenu: show });
	}
	hidePopmenu()
	{
		this.showPopmenu(false);
	}
	togglePopmenu()
	{
		this.showPopmenu(!this.popMenuIsActive());
	}
	showMenu(show = true)
	{
		this.setState({ showMenu: show });
	}
	hideMenu()
	{
		this.showMenu(false);
	}
	toggleMenu()
	{
		this.showMenu(!this.menuIsActive());
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
		if (!this.menuIsActive()) return;
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
		const tokuno = this.suggestions.getHighlightedTokuno();
		if (tokuno === null) return;

		this.setState({ tokuno });		
	}
	suggestionsClick = (index, tokuno) =>
	{
		this.setState({ tokuno });
	}

	// popmenu
	popmenuSearchClick = e =>
	{
		this.hidePopmenu();
		this.toggleMenu();
	}
	popmenuUsedClick = e =>
	{
		this.hidePopmenu();
		this.toggleUsed();
	}

	usedIsActive()
	{
		return this.state.showUsed;
	}
	showUsed(show)
	{
		this.setState({ showUsed: show });
	}
	hideUsed()
	{
		this.showUsed(false);
	}
	toggleUsed()
	{
		this.showUsed(!this.usedIsActive());
	}
	usedTokunoChange = tokuno =>
	{
		this.setState({ tokuno });
	}

	menuClose = e =>
	{
		this.hideMenu();
	}
};
class CloseButton extends React.Component 
{
	render()
	{
		return (
			<button className="button close-button is-small" onClick={this.props.onClick}>
				<span className="icon">
					<i className="fas fa-times"></i>
				</span>
			</button>
		);
	}
}
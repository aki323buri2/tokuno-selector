import './TokunoSelector.scss';
import React from 'react';
import Popmenu from './Popmenu';
import TokunoInput from './TokunoInput';
import LoadingOverlay from 'loading-overlay';
import QueryInput from './QueryInput';
import Suggestions from './Suggestions';
import UsedTokuno from './UsedTokuno';
import TokunoList from './TokunoList';
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
		showMenu: false, 
		showPopmenu: false, 
		showUsed: false, 
	};
	
	render()
	{
		const { tmasaPending, tmasa, tokuno: tokunoList } = this.props;
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

				<div className="input-section">
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
						
						<CloseButton onClick={e => this.hideMenu()}/>

						<QueryInput
							query={query}
							onChange={this.queryInputChange}
							onKeyDown={this.inputKeydown}
						/>

						<Suggestions
							ref={e => this.suggestions = e}
							tmasa={tmasa}
							tokuno={tokunoList}
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
						onChange={this.usedTokunoChange}
						closeClick={e => this.hideUsed()}
					/>
				</div>

				<div className="list-section">
					<TokunoList 
						selectedTokuno={tokuno}
						onChange={this.tokunoListChange}
					/>
				</div>
				
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
		this.hideUsed();
		this.showMenu();
	}
	
	tokunoInputChange = tokuno =>
	{
		this.setState({ tokuno });
		if (this.tokunoExists(tokuno)) this.select(tokuno);
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
		if ([ 'enter' ].includes(key))
		{
			this.enterValue();
		}
	}
	enterValue()
	{
		const tokuno = this.suggestions.getHighlightedTokuno();
		if (tokuno === null) return;

		this.setState({ tokuno });	
		this.select(tokuno);	
	}

	// popmenu
	popmenuSearchClick = e =>
	{
		this.hidePopmenu();
		this.hideUsed();
		this.showMenu();
	}
	popmenuUsedClick = e =>
	{
		this.hidePopmenu();
		this.hideMenu();
		this.showUsed();
	}

	popMenuIsActive()
	{
		return this.state.showPopmenu;
	}
	menuIsActive()
	{
		return this.state.showMenu;
	}
	usedIsActive()
	{
		return this.state.showUsed;
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
	showUsed(show = true)
	{
		this.setState({ showUsed: show });
	}
	hideUsed()
	{
		this.showUsed(false);
	}
	

	suggestionsClick = (index, tokuno) =>
	{
		this.setState({ tokuno });
		this.select(tokuno);
	}
	usedTokunoChange = tokuno =>
	{
		this.setState({ tokuno });
		this.select(tokuno);
	}

	tokunoExists(tokuno)
	{
		const { tmasa } = this.props;
		const exists = tmasa.find(t => t.tokuno === tokuno) !== undefined;
		return exists;
	}
	select(tokuno)
	{
		let { tokuno: target } = this.props;
		if (target.includes(tokuno))
		{
			target = target.filter(v => v !== tokuno);
		}
		else
		{
			target = [ ...target , tokuno ];
		}
		this.props.onChange(target);
	}
	tokunoListChange = tokuno =>
	{
		this.props.onChange(tokuno);
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
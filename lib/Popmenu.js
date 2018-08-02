import './Popmenu.scss';
import React from 'react';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';
export default class Popmenu extends React.Component
{
	static defaultProps = {
		active: false, 
	};
	render()
	{
		const { active } = this.props;
		return (
			<CSSTransition
				in={active}
				classNames="popmenu-transition"
				timeout={{ enter: 500, exit: 500 }}
				onEnter={this.onEnter}
				onExited={this.onExited}
				appear={true}
			>
				<div className="popmenu">
					
					<div className="items">
						<Item ref={e => this.search = e} icon="fas fa-search" text="検索"/>
						<Item ref={e => this.used = e} icon="fas fa-coins" text="売上あり"/>
						<Item ref={e => this.add = e} icon="fas fa-plus" text="リストに追加"/>
					</div>
				</div>
			</CSSTransition>
		);
	}
	onEnter = el =>
	{
		el.classList.add('show');
	}
	onExited = el =>
	{
		el.classList.remove('show');
	}
};
class Item extends React.Component
{
	static defaultProps = {
		icon: 'fas fa-comment-alt', 
		text: 'comment', 
	};
	render()
	{
		const { icon, text } = this.props;
		return (
			<div ref={e => this.dom = e} className="item linked">
				<span className="icon">
					<i className={classnames(icon)}></i>
				</span>
				<span>
					{text}
				</span>
			</div>
		);
	}
};
import './TokunoList.scss';
import React from 'react';
import classnames from 'classnames';
import keycodes from 'keycodes';

import { connect } from 'react-redux';
@connect(state => state)
export default class TokunoList extends React.Component
{
	static defaultProps = {
		tokuno: [], 
		tmasa: [], 
		syozok: null, 
		onChange: tokuno => {}, 
	};
	render()
	{
		const { tokuno, selectedTokuno } = this.props;
		const display = tokuno.map(tokuno =>
		{
			const ryakun = this.getRyakun(tokuno);
			return { tokuno, ryakun };
		});
		return (
			<div className="tokuno-list">
				
				
			{display.map(({ tokuno, ryakun, selected }, i) =>
				<Tag key={i} 
					tokuno={tokuno}
					ryakun={ryakun}
					closeClick={e => this.closeClick(tokuno)}
				/>
			)}
				<span className="icon linked all-clear"
					onClick={this.allClearClick}
				>
					<i className="fas fa-times"></i>
				</span>
			</div>
		);
	}
	getRyakun(tokuno)
	{
		const tmasa = this.getTmasa();
		const { ryakun } = tmasa.find(t => t.tokuno === tokuno) || {};
		return ryakun;
	}
	getTmasa()
	{
		const { tmasa, buka, syozok } = this.props;
		const { suffix } = buka.find(b => b.syozok === syozok) || {};
		return tmasa[suffix] || [];
	}
	closeClick = tokuno =>
	{
		const { tokuno: tokunoList } = this.props;
		const newTokunoList = tokunoList.filter(v => v !== tokuno);
		this.props.onChange(newTokunoList);
	}
	allClearClick = e =>
	{
		this.props.onChange([]);
	}
}
class Tag extends React.Component
{
	render()
	{
		const { tokuno, ryakun } = this.props;
		return (
			<div className="tag">
				<span className="tokuno">{tokuno}</span>
				{' '}-{' '}
				<span className="ryakun">{ryakun}</span>
				<span className="icon linked" onClick={e => this.props.closeClick(tokuno)}>
					<i className="fas fa-times"></i>
				</span>
			</div>
		);
	}
};
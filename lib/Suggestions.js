import './Suggestions.scss';
import React from 'react';
import classnames from 'classnames';
import keycodes from 'keycodes';
export default class Suggestion extends React.Component
{
	static defaultProps = {
		tmasa: [], 
		tokuno: null, 
		query: '', 
		highlighted: -1, 
		onClick: (index, tokuno) => {}, 
		limit: 15, 
	};
	state = {
		offset: 0, 
	};
	dispayl = [];
	render()
	{
		const { tmasa, tokuno, query, highlighted } = this.props;
		const { limit } = this.props;
		const { offset } = this.state;
		const filtered = this.filtered = tmasa.map(({ tokuno, ryakun }) => 
		{
			return { tokuno, ryakun };
		})
		.filter(({ tokuno, ryakun }) =>
		{
			return (
				(tokuno + '').includes(query) ||
				(ryakun + '').includes(query) ||
				false
			);
		})
		.map((tmasa, i)  => 
		{
			tmasa.selected = tmasa.tokuno === tokuno;
			return tmasa;
		});

		const display = this.display = filtered
		.slice(offset, offset + limit)
		.map((tmasa, i) =>
		{
			tmasa.highlighted = i === highlighted;
			return tmasa;
		});


		return (
			<div 
				ref={ref => this.dom = ref}
				className="suggestions"
			>
			{display.map(({ tokuno, ryakun, selected, highlighted }, i) =>
				<div key={i} 
					className={classnames('suggestion linked', {
						selected, 
						highlighted, 
					})}
					data-index={i}
					data-tokuno={tokuno}
					onClick={this.suggestionClick}
				>
					<span className="tokuno">{tokuno}</span>
					{' '}-{' '}
					<span className="ryakun">{ryakun}</span>
				</div>
			)}
			</div>
		);
	}
	suggestionClick = e =>
	{
		let node = e.target;
		while (node && node.getAttribute('data-index') === null)
		{
			node = node.parentNode;
		}
		if (!node) return;
		const index = node.getAttribute('data-index') * 1;
		const tokuno = node.getAttribute('data-tokuno') * 1;
		this.props.onClick(index, tokuno);
	}
	getFiltered()
	{
		return this.filtered;
	}
	getOffset()
	{
		return this.state.offset;
	}
	setOffset(offset, callback)
	{
		this.setState({ offset }, callback);
	}
	getLimit() 
	{
		return this.props.limit;
	}
	getDisplay()
	{
		return this.display;
	}
	tokunoByIndex(index)
	{
		return (this.display[index] || {}).tokuno || null;
	}
};
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
		limit: 15, 
		onClick: (index, tokuno) => {}, 
	};
	state = {
		offset: 0, 
		highlighted: -1, 
	};
	dispayl = [];
	render()
	{
		const { tmasa, tokuno, query } = this.props;
		const { limit } = this.props;
		const { offset, highlighted } = this.state;
		// filter
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
			tmasa.index = i;
			tmasa.selected = tmasa.tokuno === tokuno;
			tmasa.highlighted = i === highlighted;
			return tmasa;
		});
		// display
		const display = this.display = filtered.slice(offset, offset + limit);

		const hasPrev = offset > 0;
		const hasNext = offset + limit < filtered.length - 1;


		return (
			<div 
				ref={ref => this.dom = ref}
				className="suggestions"
			>
				<button className="button is-small is-fullwidth prev" disabled={!hasPrev}
					onClick={this.prevClick}
				>
					prev
				</button>
			
			{display.map(({ tokuno, ryakun, index, selected, highlighted }, i) =>
				<div key={i} 
					className={classnames('suggestion linked', {
						selected, 
						highlighted, 
					})}
					data-index={index}
					data-tokuno={tokuno}
					onClick={this.suggestionClick}
				>
					<span className="tokuno">{tokuno}</span>
					{' '}-{' '}
					<span className="ryakun">{ryakun}</span>
				</div>
			)}

				<button className="button is-small is-fullwidth next" disabled={!hasNext}
					onClick={this.nextClick}
				>
					next
				</button>

			</div>
		);
	}
	componentDidMount()
	{
		this.dom.on('wheel', this.wheel);
	}
	componentWillUnmount()
	{
		this.dom.off('wheel', this.wheel);
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
		this.setState({ highlighted: index });
		this.props.onClick(index, tokuno);
	}
	getFiltered()
	{
		return this.filtered;
	}
	getDisplay()
	{
		return this.display;
	}
	tokunoByIndex(index)
	{
		return (this.display[index] || {}).tokuno || null;
	}
	prevClick = e =>
	{
		this.setState({ offset: this.state.offset - 1 });
	}
	nextClick = e =>
	{
		this.setState({ offset: this.state.offset + 1 });
	}
	wheel = e =>
	{
		e.preventDefault();
		e.stopPropagation();
		const delta = e.deltaY > 0 ? 1 : -1;
		let { offset } = this.state;
		const filtered = this.getFiltered();
		offset += delta;
		if (offset < 0)
		{
			return;
		}
		else if (offset > filtered.length - 1)
		{
			return;
		}
		this.setState({ offset });
	}
	updownHighlighted(key)
	{
		const filtered = this.getFiltered();
		const display = this.getDisplay();
		let { offset, highlighted } = this.state;
		const { limit } = this.props;

		const delta = key === 'up' ? -1 : 1;
		highlighted += delta;

		if (highlighted < 0)
		{
			return;
		}
		else if (highlighted > filtered.length - 1)
		{
			return;
		}
		
		if (offset > highlighted) 
		{
			offset = highlighted;
		}
		else if (offset + limit - 1< highlighted)
		{
			offset = highlighted - limit + 1;
		}
		this.setState({ offset, highlighted });

	}
};
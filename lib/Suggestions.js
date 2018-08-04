import './Suggestions.scss';
import React from 'react';
import classnames from 'classnames';
import keycodes from 'keycodes';
export default class Suggestion extends React.Component
{
	static defaultProps = {
		tmasa: [], 
		tokuno: [], 
		query: '', 
		limit: 15, 
		onClick: (index, tokuno) => {}, 
	};
	state = {
		offset: 0, 
	};
	dispayl = [];
	render()
	{
		const { tmasa, tokuno, query } = this.props;
		const { limit } = this.props;
		const { offset } = this.state;
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
			tmasa.selected = tokuno.includes(tmasa.tokuno);
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
			
			{display.map(({ tokuno, ryakun, index, selected }, i) =>
				<div key={i} 
					className={classnames('suggestion linked', {
						selected, 
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
};

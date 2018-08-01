import './QueryInput.scss';
import React from 'react';
import classnames from 'classnames';
export default class QueryInput extends React.Component
{
	static props = {
		query: '', 
		onChange: query => {}, 
		onKeyDown: e => {}, 
	};
	render()
	{
		const { query } = this.props;
		return (
			<div className="query-input control has-icons-left has-icons-right">
				<input type="text" className="input"
					value={query}
					onChange={this.onChange}
					onKeyDown={this.onKeyDown}
				/>
				<span className="icon linked is-left" ref={ref => this.searchIcon = ref}>
					<i className="fas fa-search"></i>
				</span>
				<span className="icon linked is-right" ref={ref => this.barsIcon = ref}>
					<i className="fas fa-bars"></i>
				</span>
			</div>
		);
	}
	onChange = e =>
	{
		const query = e.target.value.trim();
		this.props.onChange(query);
	}
	onKeyDown = e =>
	{
		this.props.onKeyDown(e);
	}
}
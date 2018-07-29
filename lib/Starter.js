import './Starter.scss';
import React from 'react';
export default class Starter extends React.Component
{
	static defaultProps = {
		value: '', 
		onchange: value => {}, 
	};
	render()
	{
		const { value } = this.props;
		return (
			<div className="starter">
				<p className="control">
					<input type="text" className="input"
						value={value}
						onChange={this.onChange}
					/>
				</p>
			</div>
		);
	}
	onChange = e =>
	{
		this.props.onChange(e.target.value);
	}
};
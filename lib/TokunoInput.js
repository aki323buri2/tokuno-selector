import './TokunoInput.scss';
import React from 'react';
import classnames from 'classnames';
export default class TokunoInput extends React.Component
{
	static defaultProps = {
		tokuno: null, 
		dict: {}, 
		onChange: tokuno => {}, 
		onKeyDown: e => {}, 
		getInputValue: tokuno => tokuno, 
	};
	render()
	{
		const { tokuno, dict } = this.props;
		const value = this.getInputValue(tokuno);
		const valid = dict.hasOwnProperty(tokuno);
		return (
			<div 
				className={classnames('tokuno-input control has-icons-left has-icons-right', {
					valid, 
				})}
			>
				<input type="text" 
					ref={ref => this.input = ref}
					className={classnames('input is-small')}
					value={value}
					onChange={this.onChange}
					onKeyDown={this.onKeyDown}
				/>
				<span className="icon is-left linked" ref={ref => this.buildingIcon = ref}>
					<i className="fas fa-building"></i>
				</span>
				<span className="icon is-right linked" ref={ref => this.barsIcon = ref}>
					<i className="fas fa-bars"></i>
				</span>
			</div>
		);
	}
	onChange = e =>
	{
		const value = e.target.value;
		let { selectionStart: a, selectionEnd: b } = e.target;
		const tokuno = this.inputValueToTokuno(value);
		this.props.onChange(tokuno);
		if (tokuno === 0)
		{
			a = b = 1;
		}
		
		setTimeout(() =>
		{
			this.input.setSelectionRange(a, b);
		});

	}
	getInputValue(tokuno)
	{
		const { dict } = this.props;
		const ryakun = dict[tokuno];
		const value = tokuno === null ? '' : `${tokuno} - ${ryakun||''}`;
		return value;
	}
	inputValueToTokuno(value)
	{
		const tokuno = value.match(/^\d{1,10}/);
		return tokuno === null ? null : tokuno * 1;
	}
	onKeyDown = e =>
	{
		this.props.onKeyDown(e);
	}
};
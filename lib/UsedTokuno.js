import './UsedTokuno.scss';
import React from 'react';
import LoadingOverlay from 'loading-overlay';
import classnames from 'classnames';
import numeral from 'numeral';
import moment from 'moment';
const kin = n => numeral(n).format('0,0');
const day = d => moment(d).format('YYYY-MM-DD');
import { connect } from 'react-redux';
@connect(state => state)
export default class UsedTokuno extends React.Component
{
	static defaultProps = {
		active: false, 
		usedTokuno: [], 
		columns: [
			{ name: 'tokuno'  , title: '得意先CD' }, 
			{ name: 'ryakun'  , title: '得意先名' }, 
			{ name: 'ukin'    , title: '売上金額' }, 
			{ name: 'min_kjob' , title: '計上日【最小）' }, 
			{ name: 'max_kjob' , title: '計上日【最大）' }, 
		], 
		funcs: {
			ukin: n => kin(n), 
			min_kjob: d => day(d), 
			max_kjob: d => day(d), 
		}, 
		selectedTokuno: null, 
		onChange: tokuno => {}, 
		closeClick: () => {}, 
	}; 
	state = {
		offset: 0, 
		limit: 15, 
	};
	constructor(props)
	{
		super(props)
		this.state.context = this;
	}
	static getDerivedStateFromProps(props, state)
	{
		if (props.active !== state.active)
		{
			if (props.active)
			{
				state.context.fetchUsedTokuno();
			}
			return { active: props.active }; 
		}
		return null;
	}
	render()
	{
		const { active, usedTokuno, usedTokunoPending } = this.props;
		const { columns, funcs } = this.props;
		const { selectedTokuno: tokuno } = this.props;
		const { offset, limit } = this.state;
		const filtered = this.filtered = usedTokuno.filter(tmasa => 
		{
			return true;
		})
		.map(tmasa =>
		{
			tmasa.selected = tmasa.tokuno === tokuno;
			return tmasa;
		});
		const display = this.display = filtered.slice(offset, offset + limit);

		const canBackward = offset > 0;
		const canForward = filtered.length - offset  > limit;
		return (
			<div className={classnames('used-tokuno', { active })}>

				<CloseButton
					onClick={this.closeClick}
				/>

				<LoadingOverlay 
					active={usedTokunoPending}
					text="売上のあった得意先一覧を取得しています..."
				/>
				
				<table 
					ref={e => this.table = e}
					className="table is-narrow is-striped"
				>
					<thead>
						<tr>
						{columns.map(({ name, title }, i) =>
							<th key={i}
								className={name}
							>
								{title}
							</th>
						)}
						</tr>
					</thead>
					<tbody>
						<tr>
							<td colSpan={columns.length}>
								<SCrollButton 
									ref={e => this.prev = e}
									className="prev button is-small is-fullwidth"
									disabled={!canBackward}
									onClick={this.prevClick}
								>prev</SCrollButton>
							</td>
						</tr>

					{display.map((tmasa, i) => 
						<tr key={i} 
							className={classnames('linked', {
								'is-selected': tmasa.selected, 
							})}
							onClick={e => this.rowClick(tmasa, offset + i)}
						>
						{columns.map(({ name, title }, i) =>
							<td key={i} className={name}>
								{(funcs[name]||(v=>v))(tmasa[name])}
							</td>
						)}
						</tr>
					)}

						<tr>
							<td colSpan={columns.length}>
								<SCrollButton 
									ref={e => this.next = e}
									className="next button is-small is-fullwidth"
									disabled={!canForward}
									onClick={this.nextClick}
								>next</SCrollButton>
							</td>
						</tr>
					</tbody>
				</table>

			</div>
		);
	}
	componentDidMount()
	{
		this.table.on('wheel', this.wheel);
	}
	componentWillUnmount()
	{
		this.table.off('wheel', this.wheel);
	}
	fetchUsedTokuno()
	{
		this.props.dispatch({ type: 'FETCH_USED_TOKUNO', });
	}
	closeClick = e =>
	{
		this.props.closeClick();
	}
	prevClick = e =>
	{
		this.addOffset(-1);
	}
	nextClick = e =>
	{
		this.addOffset(1);
	}
	addOffset(add)
	{
		const { filtered } = this;
		const { limit } = this.state;
		let { offset } = this.state;
		offset += add;
		if (offset < 0) return;
		if (filtered.length - offset < limit) return;
		this.setState({ offset });
	}
	wheel = e =>
	{
		const delta = e.deltaY > 0 ? 1 : -1;
		this.addOffset(delta);
	}
	rowClick = (tmasa, index) =>
	{
		this.props.onChange(tmasa.tokuno);
	}
};
class CloseButton extends React.Component
{
	render()
	{
		return (
			<button 
				className="button close-button is-small"
				onClick={this.props.onClick}
			>
				<span className="icon">
					<i className="fas fa-times"></i>
				</span>
			</button>
		);
	}
};
class SCrollButton extends React.Component
{
	static defaultProps = {
		waitMilliseconds: 500, 
		intervalMilliseconds: 100, 
		onClick: e => {}, 
	}
	render()
	{
		const { children, className, disabled, onClick } = this.props;
		return (
			<button 
				ref={e => this.dom = e}
				className={className}
				disabled={disabled}
				onClick={onClick}
			>
				{children}
			</button>
		);
	}
	

};
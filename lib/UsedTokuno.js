import './UsedTokuno.scss';
import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import numeral from 'numeral';
import moment from 'moment';
const kin = n => numeral(n).format('0,0');
const day = d => moment(d).format('YYYY-MM-DD');
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
		}
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
		const { active, usedTokuno, columns, funcs } = this.props;
		const { offset, limit } = this.state;
		const filtered = this.filtered = usedTokuno.filter(tmasa => 
		{
			return true;
		});
		const display = this.display = filtered.slice(offset, offset + limit);
		return (
			<div className={classnames('used-tokuno', { active })}>
				
				<table className="table is-narrow is-striped">
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
					{display.map((tmasa, i) => 
						<tr key={i}>
						{columns.map(({ name, title }, i) =>
							<td key={i} className={name}>
								{(funcs[name]||(v=>v))(tmasa[name])}
							</td>
						)}
						</tr>
					)}
					</tbody>
				</table>

			</div>
		);
	}
	fetchUsedTokuno()
	{
		this.props.dispatch({ type: 'FETCH_USED_TOKUNO', });
	}
};
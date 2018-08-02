import './UsedTokuno.scss';
import React from 'react';
import classnames from 'classnames';
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
			{ name: 'kjobMin' , title: '計上日【最小）' }, 
			{ name: 'kjobMax' , title: '計上日【最大）' }, 
		], 
	}; 
	state = {
		offset: 0, 
		limit: 15, 
	};
	render()
	{
		const { active, usedTokuno, columns } = this.props;
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
								{tmasa[name]}
							</td>
						)}
						</tr>
					)}
					</tbody>
				</table>

			</div>
		);
	}
};
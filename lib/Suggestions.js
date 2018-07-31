import './Suggestions.scss';
import React from 'react';
import classnames from 'classnames';
import keycodes from 'keycodes';
export default class Suggestion extends React.Component
{
	static defaultProps = {
		dict: {}, 
		tokuno: null, 
	};
	render()
	{
		const { dict, tokuno } = this.props;
		const display = Object.entries(dict).map(([ tokuno, ryakun ]) => 
		{
			return { tokuno, ryakun };
		})
		.slice(0, 20);

		return (
			<div className="suggestions">
			{display.map(({ tokuno, ryakun }, i) =>
				<div key={i} className="suggestion">
					<span className="tokuno">{tokuno}</span>
					<span className="ryakun">{ryakun}</span>
				</div>
			)}
			</div>
		);
	}
};
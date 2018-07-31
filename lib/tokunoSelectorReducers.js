export const tokunoSelectorReducers = {
	tokuno: (state = [], action) =>
	{
		if (action.type === 'TOKUNO') return [ ...state, ...action.payload ];
		return state;
	}, 
	tmasa: (state = {}, action) =>
	{
		if (action.type === 'TMASA') return action.payload;
		return state;
	}, 
};
export default tokunoSelectorReducers;
export const tokunoSelectorReducers = {
	tokuno: (state = [], action) =>
	{
		if (action.type === 'TOKUNO') return action.payload;
		return state;
	}, 
	tmasa: (state = {}, action) =>
	{
		if (action.type === 'TMASA') return action.payload;
		return state;
	}, 
	tmasaPending: (state = false, action) =>
	{
		if (action.type === 'TMASA_PENDING') return action.payload;
		return state;
	}, 
	usedTokuno: (state = [], action) =>
	{
		if (action.type === 'USED_TOKUNO') return action.payload;
		return state;
	}, 
	usedTokunoPending: (state = false, action) =>
	{
		if (action.type === 'USED_TOKUNO_PENDING') return action.payload;
		return state;
	}, 
};
export default tokunoSelectorReducers;
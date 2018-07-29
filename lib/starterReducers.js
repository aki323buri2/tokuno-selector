export const starterReducers = {
	starter: (state = '', action) =>
	{
		if (action.type === 'STARTER') return action.payload;
		return state;
	}, 
};
export default starterReducers;
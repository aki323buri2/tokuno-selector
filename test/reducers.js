export const reducers = {
	test: (state = null, action) =>
	{
		if (action.type === 'TEST') return action.payload;
		return state;
	}, 
};
export default reducers;
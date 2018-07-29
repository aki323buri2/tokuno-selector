import { put, call, fork, takeLatest } from 'redux-saga/effects';
export const starterSaga = function *()
{
	yield fork(function *()
	{
		yield put({ type: 'STARTER', payload: 'starter' });
	});
};
export default starterSaga;
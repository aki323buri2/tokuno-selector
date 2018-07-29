import { put, call, fork } from 'redux-saga/effects';
export const mainSaga = function *()
{
	yield put({ type: 'TEST', payload: 'test' });
};
export default mainSaga;
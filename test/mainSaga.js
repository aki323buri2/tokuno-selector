import { put, call, fork } from 'redux-saga/effects';
import starterSaga from '../lib/starterSaga';
export const mainSaga = function *()
{
	yield fork(starterSaga);
};
export default mainSaga;
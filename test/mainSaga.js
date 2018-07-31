import { put, call, fork } from 'redux-saga/effects';
import tokunoSelectorSaga from '../lib/tokunoSelectorSaga';
export const mainSaga = function *()
{
	yield fork(tokunoSelectorSaga);
};
export default mainSaga;
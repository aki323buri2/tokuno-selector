import { put, call, fork, takeLatest } from 'redux-saga/effects';
import { all } from 'redux-saga/effects';
import axios from 'axios';
export const tokunoSelectorSaga = function *()
{
	yield fork(function *()
	{
		yield put({ type: 'FETCH_TMASA' });
	});
	yield takeLatest('FETCH_TMASA', function *(action)
	{
		yield put({ type: 'TMASA_PENDING', payload: true });
		yield put({ type: 'TMASA', payload: yield call(fetchTmasa) });
		yield put({ type: 'TMASA_PENDING', payload: false });
	});
};
export default tokunoSelectorSaga;

const fetchTmasa = function *()
{
	const fetch = (url, params) => axios.get(url, { params }).then(res => res.data);
	const url = 'http://laravel.suisvr.zeus.sss/tmasa';
	try
	{
		const suffixes = [ 
			'', 
			610, 
			710, 
			910, 
		];
		const tmasa = yield all(suffixes.reduce((acc, suffix) =>
		{
			acc[suffix] = call(fetch, url, { suffix });
			return acc;
		}, {}));
		return tmasa;
	}
	catch (err)
	{
		throw err;
	}
}
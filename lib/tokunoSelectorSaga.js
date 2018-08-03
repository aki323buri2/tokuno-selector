import { put, call, fork, takeLatest } from 'redux-saga/effects';
import { all, select } from 'redux-saga/effects';
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
	yield takeLatest('FETCH_USED_TOKUNO', function *(action)
	{
		yield put({ type: 'USED_TOKUNO_PENDING', payload: true });
		yield put({ type: 'USED_TOKUNO', payload: yield call(fetchUsedTokuno) });
		yield put({ type: 'USED_TOKUNO_PENDING', payload: false });
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
		yield put({ type: 'FETCH_TMASA_ERROR', payload: err });
		return [];
	}
}
const fetchUsedTokuno = function *()
{
	const { kjob, syozok } = yield select();

	const params = {
		kjob: [
			kjob.since.format('YYYYMMDD'), 
			kjob.until.format('YYYYMMDD'), 
		].join(','), 
		syozok, 
	};
	
	const url = 'http://laravel.suisvr.zeus.sss/used-tokuno';
	try 
	{
		const usedTokuno = yield call(async e => await axios.get(url, { params }).then(res => res.data));
		return usedTokuno;
	}
	catch (err)
	{
		yield put({ type: 'FETCH_USED_TOKUNO_ERROR', payload: err });
		return [];
	}

	return [];
}
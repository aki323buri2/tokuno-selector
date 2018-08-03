import path from 'path';
import fs from 'fs-extra';
import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import createSaga from 'redux-saga';
import { all } from 'redux-saga/effects';
Promise.resolve().then(e => main()).catch(err =>
{
	console.error(err);
});
const main = async e =>
{
	const saga = createSaga();
	const store = createStore(() => {}, applyMiddleware(saga));
	saga.run(mainSaga);
};
const mainSaga = function *()
{
	const url = 'http://laravel.suisvr.zeus.sss/tmasa';
	const suffixes = [ '', 610, 710, 910 ];
	const tmasa = yield all(suffixes.reduce((acc, suffix) =>
	{
		acc[suffix] = axios.get(url, { params: { suffix } }).then(res => res.data);
		return acc;
	}, {}));
	
	Object.entries(tmasa).map(([ suffix, tmasa ]) =>
	{
		const data = [
			'[', 
			tmasa.map(tmasa => JSON.stringify(tmasa)).join(',\n'), 
			']', 
		].join('\n');
		
		fs.writeFile(path.resolve(__dirname, `tmasa${suffix}.js`), data);
	});

};
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { createApp } from 'redux-saga-app';
import App from './App';
import reducers from './reducers';
import mainSaga from './mainSaga';

Promise.resolve().then(e => 
{
	const app = createApp(App, reducers);
	render(app, document.body.appendChild(document.createElement('div')));
	app.run(mainSaga);
});
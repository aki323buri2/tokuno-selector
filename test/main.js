import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
Promise.resolve().then(e => 
{
	const app = <div className="app">app</div>;
	render(app, document.body.appendChild(document.createElement('div')));
});
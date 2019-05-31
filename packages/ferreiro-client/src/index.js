import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'

import App from './app/App';
import {Blog} from './app/blog/Blog';

ReactDOM.render(
	<Blog />,
	document.getElementById('blog')
);

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('app')
);

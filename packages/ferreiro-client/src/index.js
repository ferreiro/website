import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'

import App from './App';
import {Blog} from './pages/blog/Blog';

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

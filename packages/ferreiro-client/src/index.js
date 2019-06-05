import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'

// import {App} from './App';
import {Blog} from './pages/blog/Blog';
import {ScrollToTop} from './ScrollToTop'

ReactDOM.render(
	<BrowserRouter>
		<ScrollToTop>
			<Blog />
		</ScrollToTop>
	</BrowserRouter>
	, document.getElementById('blogApp')
);

// ReactDOM.render(
// 	<App />,
// 	document.getElementById('app')
// );

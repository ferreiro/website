import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'

import {App} from './App';
import {ScrollToTop} from './ScrollToTop'

ReactDOM.render(
	<BrowserRouter>
		<ScrollToTop>
			<App />
		</ScrollToTop>
	</BrowserRouter>
	, document.getElementById('app')
);
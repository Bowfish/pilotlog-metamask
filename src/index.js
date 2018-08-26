// react imports
import React from 'react';
import ReactDOM from "react-dom";
import { Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

//import { Router } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'

// container imports
import AppContainer from './ui/AppContainer';
import LoadingContainer from './ui/LoadingContainer';

// redux imports
import store from "./redux/store";

// drizzle imports
import { DrizzleProvider } from 'drizzle-react'
import drizzleOptions from './drizzle/options'

import "./styles/semantic-dist/semantic.css";
import browserHistory from './redux/history'

/*
import Datum from 'datum-sdk'
console.log(Datum)
*/

// make the store avialable to the browser console
window.store = store

// if metamsk injects web3 0.20.0 we replace it with web3 1.0.0
/*
if (window.web3) {
	window.web3 = new Web3(window.web3.currentProvider);
}
*/

//console.log(store)

ReactDOM.render((
	<DrizzleProvider options={drizzleOptions} store={store}>
		<Provider store={store}>
			<LoadingContainer>
				<ConnectedRouter history={browserHistory}>
					<Switch>
						<Route path='/' component={AppContainer} />
					</Switch>
				</ConnectedRouter>
			</LoadingContainer>
		</Provider>
	</DrizzleProvider>
	),
	document.getElementById('root')
);

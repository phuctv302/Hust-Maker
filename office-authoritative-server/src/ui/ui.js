
// import { React } from './react.lib/react.development';
// import { ReactDOM } from './react.lib/react-dom.development';
import React from 'react';
import ReactDOM from 'react-dom/client';

import Root from './root.js';


class UI {
	// __id;
	__root;

	__application;

	/**
	 * 
	 * @param {Application} application 
	 */
	constructor(application) {
		// this.__id = id;

		this.__application = application;
		const dom_container = document.getElementById('root');

		this.__root = null;
		if (dom_container) {
			this.__root = ReactDOM.createRoot(dom_container);
		}
		
		
	}

	render() {
		if (!this.__root) {
			return;
		}
		this.__root.render(<Root application={this.__application}/>);
	}
}

export { UI };


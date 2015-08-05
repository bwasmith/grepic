import React  from 'react';
import Router from 'react-router';
import routes from './config/routes';

console.log("app.js!")

//react router gives you state, some router-y properties like route params, path, etc.
Router.run(routes, Router.HistoryLocation, (Root, state) => {
	React.render(<Root {...state} />, document.getElementById('app'));
});

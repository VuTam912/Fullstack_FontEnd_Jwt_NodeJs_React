import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProivder } from './context/UserContext';
// boostrap
import 'bootstrap/dist/css/bootstrap.min.css';
//font-awesome
import 'font-awesome/css/font-awesome.min.css';

ReactDOM.render(
	<React.StrictMode>
		<UserProivder>
			<App />
		</UserProivder>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React, { useState } from 'react';
import { getUserAccount } from '../services/userService';
import { useEffect } from 'react';

// React Context: Luu thong tin global - cho phép các component có thể truy cập được biến mà ko cần phải truyền props từ cha sang con (component)

const UserContext = React.createContext(null); // biến khởi tạo

// children = component
const UserProivder = ({ children }) => {
	const userDefault = {
		isLoading: true, // mat dinh la dang show loading - fix error refresh (F5)
		isAuthenticated: false,
		token: '',
		acoount: {},
	};

	// init
	const [user, setUser] = useState(userDefault);

	// Login updates the user data with a name parameter
	const loginContext = (userData) => {
		setUser({ ...userData, isLoading: false }); // turn off loading
	};

	// Logout updates the user data to default
	const logout = () => {
		setUser((user) => ({
			name: '',
			auth: false,
		}));
	};

	// chay ngan (background)
	// get user info was logged : Refresh lai
	const fetchUser = async () => {
		let response = await getUserAccount(); // call tu phia server va server return lai
		if (response && response.EC === 0) {
			let groupwtihRoles = response.DT.groupwtihRoles;
			let email = response.DT.email;
			let username = response.DT.username;
			let token = response.DT.access_token;

			// set sessionStorage - luu thong tin trang thai
			let data = {
				isAuthenticated: true,
				token,
				acoount: {
					groupwtihRoles,
					email,
					username,
				},
				isLoading: false,
			};

			// luu thong tin va cac component khac se duoc truy cap bien do lam if ... khi user da logged
			setUser(data);
		} else {
			// neu response bi loi/ko co user thi set lai default
			setUser({ ...userDefault, isLoading: false });
		}
	};

	// thuc thi khi render xong - Fix: when user press F5 or refresh to get userAccount agains
	useEffect(() => {
		if (
			window.location.pathname !== '/' ||
			window.location.pathname !== '/login'
		) {
			fetchUser(); // when render xong thi turn off loading
		}
	}, []);

	return (
		<UserContext.Provider value={{ user, loginContext, logout }}>
			{children}
		</UserContext.Provider>
	);
};

export { UserContext, UserProivder };

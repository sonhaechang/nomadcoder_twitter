import React, { useEffect, useState } from 'react';
import AppRouter from 'components/AppRouter';
import { authService } from 'fbase';
import { onAuthStateChanged, updateProfile } from "firebase/auth";

function App() {
	const [init, setInit] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userObj, setUserObj] = useState(null);

	const refreshUser = () => {
		const user = authService.currentUser;

		setUserObj({
			displayName: user.displayName,
			uid: user.uid,
			updateProfile: (args) => updateProfile(
				user, { displayName: user.displayName }
			)
		});
	}

	useEffect(() => {
		onAuthStateChanged(authService, (user) => {
			if (user) {
				setIsLoggedIn(true);
				setUserObj({
					displayName: user.displayName,
					uid: user.uid,
					updateProfile: (args) => updateProfile(
						user, { displayName: user.displayName }
					)
				});
			} else {
				setIsLoggedIn(false);
			}
 
			setInit(true);
		});
	}, [])

	return (
		<>
			{
				init ? 
				<AppRouter 
					refreshUser={refreshUser} 
					isLoggedIn={isLoggedIn} 
					userObj={userObj} 
				/> : 
				'Initializing...'
			}
			<footer>&copy; {new Date().getFullYear()} Nwitter</footer>
		</>
	);
}

export default App;
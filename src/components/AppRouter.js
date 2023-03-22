import { HashRouter, Routes, Route } from 'react-router-dom';
import Profile from 'routes/Profile';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Navigation from 'components/Navigation';

function AppRouter({ refreshUser, isLoggedIn, userObj }) {
    return (
        <HashRouter>
            {isLoggedIn && <Navigation userObj={userObj} />}

            <div
                style={{
                    maxWidth: 890,
                    width: "100%",
                    margin: "auto",
                    marginTop: 80,
                    marginBottom: 80,
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Routes>
                    {
                        isLoggedIn ? 
                        <>
                            <Route 
                                path='/' 
                                element={
                                    <Home userObj={userObj} />
                                } 
                            />
                            <Route 
                                path='/profile' 
                                element={
                                    <Profile 
                                        userObj={userObj} 
                                        refreshUser={refreshUser}
                                    />
                                } 
                            />
                        </> 
                        : 
                        <Route path='/' element={<Auth />} />
                    }
                </Routes>
            </div>
        </HashRouter>
    );
}

export default AppRouter;
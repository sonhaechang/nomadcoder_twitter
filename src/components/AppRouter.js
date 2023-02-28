import { HashRouter, Routes, Route } from 'react-router-dom';
import Profile from 'routes/Profile';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Navigation from 'components/Navigation';

function AppRouter({ isLoggedIn }) {
    return (
        <HashRouter>
            {isLoggedIn && <Navigation />}

            <Routes>
                {
                    isLoggedIn ? 
                    <>
                        <Route path='/' element={<Home />} />
                        <Route path='/profile' element={<Profile />} />
                    </> 
                    : 
                    <Route path='/' element={<Auth />} />
                }
            </Routes>
        </HashRouter>
    );
}

export default AppRouter;
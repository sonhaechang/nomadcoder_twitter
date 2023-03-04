import { authService, dbService } from 'fbase';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile({ userObj }) {
    const navigate = useNavigate();

    const onLogOutClick = () => {
        authService.signOut();
        navigate('/');
    }

    const getMyNweets = async() => {
        const q = query(
            collection(dbService, 'nweets'), 
            where('createrId', '==', userObj.uid),
            orderBy('createdAt', 'desc')
        );
        
        const querySnapsht = await getDocs(q);

        querySnapsht.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
        });
    };

    useEffect(() => {
        getMyNweets();
    }, [])
    
    return (
        <>
            <button onClick={onLogOutClick}>
                Logout
            </button>
        </>
    );
}

export default Profile;
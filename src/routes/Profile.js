import { authService, dbService } from 'fbase';
import { updateProfile } from 'firebase/auth';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile({ refreshUser, userObj }) {
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)

    const navigate = useNavigate();

    const onLogOutClick = () => {
        authService.signOut();
        navigate('/');
    }

    const onChange = (e) => {
        const { target: { value } } = e;
        setNewDisplayName(value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if ( userObj.displayName !== newDisplayName ) {
            await updateProfile(authService.currentUser, {displayName: newDisplayName});
        }
        refreshUser();
    }

    const getMyNweets = async () => {
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
            <form onSubmit={onSubmit}>
                <input 
                    type="text" 
                    placeholder='Display name' 
                    onChange={onChange}
                    defaultValue={newDisplayName}
                />
                <input type="submit" value="Update Profile" />
            </form>

            <button onClick={onLogOutClick}>
                Logout
            </button>
        </>
    );
}

export default Profile;
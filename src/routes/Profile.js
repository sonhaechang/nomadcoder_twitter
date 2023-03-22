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
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input 
                    type="text" 
                    placeholder='Display name' 
                    className="formInput"
                    autoFocus
                    onChange={onChange}
                    defaultValue={newDisplayName}
                />

                <input
                    type="submit"
                    value="Update Profile"
                    className="formBtn"
                    style={{ marginTop: 10 }}
                />
            </form>

            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                Log Out
            </span>
        </div>
    );
}

export default Profile;
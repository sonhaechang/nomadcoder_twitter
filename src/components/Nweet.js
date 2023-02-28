import React, { useState } from 'react';
import { dbService } from 'fbase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';

function Nweet({ nweetObj, isOwner }) {
    const [editing, setEdting] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const NweetTextRef = doc(dbService, 'nweets', `${nweetObj.id}`);

    const onDeleteClick = async () => {
        const ok = window.confirm('Are you sure you want to delete this nweet?');
        
        if (ok) {
            await deleteDoc(NweetTextRef);
        }
    };

    const onChange = (e) => {
        const { target: {value} } = e;
        setNewNweet(value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        await updateDoc(NweetTextRef, {
            text: newNweet
        });
        
        setEdting(false);
    }

    const toggleEditing = () => setEdting(prev => !prev);

    return (
        <div>
            {
                editing ? 
                <>
                    <form onSubmit={onSubmit}>
                        <input 
                            type="text" 
                            placeholder='Edit your nweet'
                            defaultValue={newNweet}
                            onChange={onChange}
                            required
                        />
                        <input 
                            type="submit" 
                            value="Update Nweet" 
                        />
                    </form> 
                    <button onClick={toggleEditing}>
                        Cancel
                    </button>
                </>:
                <>
                    <h4>{nweetObj.text}</h4>
                    {
                        isOwner && (
                            <>
                                <button onClick={onDeleteClick}>
                                    Delete Nweet
                                </button>
                                <button onClick={toggleEditing}>
                                    Edit Nweet
                                </button>   
                            </>
                        )
                    }
                </>
            }
        </div>
    );
};

export default Nweet;
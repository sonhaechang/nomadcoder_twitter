import React, { useState } from 'react';
import { dbService, storageSevice } from 'fbase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';

function Nweet({ nweetObj, isOwner }) {
    const [editing, setEdting] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const NweetTextRef = doc(dbService, 'nweets', `${nweetObj.id}`);

    const onDeleteClick = async () => {
        const ok = window.confirm('Are you sure you want to delete this nweet?');
        
        if (ok) {
            await deleteDoc(NweetTextRef);
            await deleteObject(ref(storageSevice, nweetObj.attachmentUrl));
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
                        nweetObj.attachmentUrl &&
                        <img 
                            src={nweetObj.attachmentUrl} 
                            alt='upload_image' 
                            style={{ width: '50px', height: '50px' }} 
                        />
                    }

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
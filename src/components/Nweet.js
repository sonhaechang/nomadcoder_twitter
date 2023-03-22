import React, { useState } from 'react';
import { dbService, storageSevice } from 'fbase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
        <div className="nweet">
            {
                editing ? 
                <>
                    <form onSubmit={onSubmit} className="container nweetEdit">
                        <input 
                            type="text" 
                            placeholder='Edit your nweet'
                            className="formInput"
                            defaultValue={newNweet}
                            onChange={onChange}
                            required
                            autoFocus
                        />
                        <input 
                            type="submit" 
                            className="formBtn" 
                            value="Update Nweet" 
                        />
                    </form> 
                    <button 
                        className="formBtn cancelBtn"
                        onClick={toggleEditing}>
                        Cancel
                    </button>
                </>:
                <>
                    <h4>{nweetObj.text}</h4>

                    {
                        nweetObj.attachmentUrl &&
                        <img src={nweetObj.attachmentUrl} alt='upload_image' />
                    }

                    {
                        isOwner && (
                            <div className="nweet__actions">
                                <span onClick={onDeleteClick}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </span>
                                <span onClick={toggleEditing}>
                                    <FontAwesomeIcon icon={faPencilAlt} />
                                </span>
                            </div>
                        )
                    }
                </>
            }
        </div>
    );
};

export default Nweet;
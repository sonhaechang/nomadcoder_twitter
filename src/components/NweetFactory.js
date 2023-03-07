import { dbService, storageSevice } from 'fbase';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import React, { useRef, useState } from 'react';
import { v4 as uuid4 } from 'uuid';

function NweetFactory({ userObj }) {
    const [nweet, setNweet] = useState('');
    const [attachment, setAttachment] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        let attachmentUrl = '';
        
        if (attachment !== '') {
            const attachmentRef = ref(storageSevice, `${userObj.uid}/${uuid4()}`);
            const response = await uploadString(attachmentRef, attachment, 'data_url');
            attachmentUrl = await getDownloadURL(response.ref);
        }

        const nweetObj = {
            text: nweet,
            createdAt: Date.now(),
            createrId: userObj.uid,
            attachmentUrl
        }

        await addDoc(collection(dbService, 'nweets'), nweetObj);

        setNweet('');
        setAttachment('');
    };

    const onChange = (e) => {
        const { target: {value} } = e;
        setNweet(value);
    };

    const onFileChange = (e) => {
        const { target: {files} } = e;
        const theFile = files[0];
        const reader = new FileReader();

        reader.onloadend = (finishedEvent) => {
            const { currentTarget: {result} } = finishedEvent;
            setAttachment(result);
        };

        reader.readAsDataURL(theFile);
    };

    const fileInput = useRef();
    
    const onClearAttachment = () => {
        setAttachment(null);
        fileInput.current.value = null;
    };

    return (
        <form onSubmit={onSubmit}>
            <input 
                value={nweet}
                onChange={onChange}
                type="text" 
                placeholder="What's on your mind?" 
                maxLength={120} 
            />
            <input 
                type="file" 
                accept='image/*'
                ref={fileInput}
                onChange={onFileChange} 
            />
            <input 
                type="submit" 
                value='Nweet' 
            />
            {
                attachment && 
                <div>
                    <img 
                        src={attachment} 
                        alt='image_preview' 
                        style={{ width: '50px', height: '50px' }} 
                    />
                    <button onClick={onClearAttachment}>
                        Clear
                    </button>
                </div>
            }
        </form>
    );
};

export default NweetFactory;
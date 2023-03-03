import Nweet from 'components/Nweet';
import { dbService } from 'fbase';
import { 
    addDoc, 
    collection,
    onSnapshot,
    query,
    orderBy
} from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';

function Home({ userObj }) {
    const [nweet, setNweet] = useState('');
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState();

    const onSubmit = async (e) => {
        e.preventDefault();

        await addDoc(collection(dbService, 'nweets'), {
            text: nweet,
            createdAt: Date.now(),
            createrId: userObj.uid
        });

        setNweet('');
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

    useEffect(() => {
        const q = query(
            collection(dbService, 'nweets'),
            orderBy('createdAt', 'desc')
        );

        onSnapshot(q, (snapshot) => {
            const nweetArr = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            
            setNweets(nweetArr);
        });
    }, []);

    return (
        <div>
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
                <input 
                    type="submit" 
                    value='Nweet' 
                />
            </form>
            <div>
                {nweets.map((nweet) => 
                    <Nweet 
                        key={nweet.id} 
                        nweetObj={nweet} 
                        isOwner={nweet.createrId === userObj.uid}
                    />
                )}
            </div>
        </div>
    );
};

export default Home;
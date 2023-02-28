import { dbService } from 'fbase';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

function Home() {
    const [nweet, setNweet] = useState('');
    const [nweets, setNweets] = useState([]);

    const getNweets = async () => {
        const dbNweets = await getDocs(collection(dbService, 'nweets'));

        dbNweets.forEach(doc => {
            const nweetObject = {
                ...doc.data(),
                id: doc.id
            }

            setNweets((prev) => [nweetObject, ...prev]);
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        await addDoc(collection(dbService, 'nweets'), {
            nweet,
            createdAt: Date.now(),
        });

        setNweet('');
    };

    const onChange = (e) => {
        const { target: {value} } = e;
        
        setNweet(value);
    };

    useEffect(() => {
        getNweets();
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
                    type="submit" 
                    value='Nweet' 
                />
            </form>
            <div>
                {nweets.map(nweet => 
                    <div key={nweet.id}>
                        <h4>{nweet.nweet}</h4>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
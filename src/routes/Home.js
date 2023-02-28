import { dbService } from 'fbase';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';

function Home() {
    const [nweet, setNweet] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        await addDoc(collection(dbService, 'nweets'), {
            nweet,
            createdAt: Date.now(),
        });
        setNweet('');
    }

    const onChange = (e) => {
        const { target: {value} } = e;
        setNweet(value);
    }

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
        </div>
    );
}

export default Home;
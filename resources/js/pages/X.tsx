import React, { useState } from 'react';
import axios from 'axios';

const X = () => {
  const [message, setMessage] = useState('');

  const postToTwitter = async () => {
    try {
      const res = await axios.post('/api/twitter/post', { message });
      alert('Tweet posted successfully!');
      setMessage('');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to post tweet');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Post to Twitter</h2>
      <textarea
        rows={3}
        style={{ width: '100%', marginBottom: 10 }}
        placeholder="Type your tweet here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={postToTwitter}>Post</button>
    </div>
  );
};

export default X;

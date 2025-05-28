import axios from 'axios';
import { useState } from 'react';

const youtubeUploadSchedule = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [scheduledAt, setScheduledAt] = useState('');
    const [file, setFile] = useState(null);

    const uploadVideo = async () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('scheduled_at',scheduledAt);
        formData.append('video', file);

        try {
            const response = await axios.post('/api/youtube/uploadScheduled', formData);
            console.log(response.data);
            alert('Finished')
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

    return (
        <div>
            <h2>Upload YouTube Video</h2>
            <div></div>
            <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
            <textarea placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
            <input type="file" accept="video/*" onChange={(e) => setFile(e.target.files[0])} />
            <input type="datetime-local" onChange={(e)=>setScheduledAt(e.target.value)}/>
            <button onClick={uploadVideo}>Upload</button>
        </div>
    );
};

export default youtubeUploadSchedule;
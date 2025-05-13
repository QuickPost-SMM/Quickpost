import axios from 'axios';
import { useEffect, useState } from 'react';

export default function YouTubeVideos() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get('/api/youtube/videos')
            .then((response) => {
                setVideos(response.data.videos);
                console.log(response.data);
                
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching videos:', error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading videos...</div>;

    return (
        <div className="video-grid">
            {videos.map((video) => (
                <div key={video.id} className="video-card">
                    <img src={video.thumbnail} alt={video.title} />
                    <h3>{video.title}</h3>
                    <p>
                        Views: {video.views} • Likes: {video.likes}
                    </p>
                    <a href={video.url} target="_blank" rel="noopener">
                        Watch on YouTube
                    </a>
                </div>
            ))}
        </div>
    );
}

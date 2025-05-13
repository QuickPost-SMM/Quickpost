interface YouTubeVideo {
    id: string;
    title: string;
    published_at: string;
    views: number;
    thumbnail: string;
    url: string;
}

interface Post {
    id: string;
    platform: string;
    content: string;
    scheduledAt: string;
    engagement: number;
    status: string;
    thumbnail: string;
    url: string;
}
import { Link } from '@inertiajs/react';
import { AlertCircle, CheckCircle, Clock, Youtube } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function RecentPostsList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchYouTubeVideos = async () => {
            try {
                const response = await axios.get('/api/youtube/videos');
                // Transform and validate YouTube API response
                const youtubePosts = response.data.videos.map(video => ({
                    id: video.id || 'unknown-id',
                    platform: 'youtube',
                    content: video.title || 'No title',
                    scheduledAt: video.stats.published_at || new Date().toISOString(),
                    engagement: video.stats.views || 0, // Default to 0 if views is undefined
                    status: 'published', // Default status
                    thumbnail: video.thumbnail || '',
                    url: video.url || '#'
                }));
                setPosts(youtubePosts.slice(0, 5));
            } catch (err) {
                setError('Failed to load recent posts');
                console.error('Error fetching videos:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchYouTubeVideos();
    }, []);

    const renderPlatformIcon = (platform: string) => {
        switch (platform?.toLowerCase()) { // Added optional chaining
            case 'youtube':
                return <Youtube className="h-5 w-5 text-red-600" />;
            default:
                return null;
        }
    };

    const renderStatusIcon = (status: string) => {
        switch (status?.toLowerCase()) { // Added optional chaining
            case 'published':
                return <CheckCircle className="h-5 w-5 text-green-500" />;
            case 'scheduled':
                return <Clock className="h-5 w-5 text-amber-500" />;
            case 'failed':
                return <AlertCircle className="h-5 w-5 text-red-500" />;
            default:
                return null;
        }
    };

    const getStatusClass = (status: string) => {
        switch (status?.toLowerCase()) { // Added optional chaining
            case 'published':
                return 'bg-green-100 text-green-800';
            case 'scheduled':
                return 'bg-amber-100 text-amber-800';
            case 'failed':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) return <div className="p-4 text-center">Loading recent posts...</div>;
    if (error) return <div className="p-4 text-center text-gray-500">{error}</div>;
    if (posts.length === 0) return <div className="p-4 text-center text-gray-500">No videos found</div>;

    return (
        <div className="overflow-hidden">
            <ul className="divide-y divide-gray-200">
                {posts.map((post) => (
                    <li key={post.id} className="py-4">
                        <div className="flex items-start space-x-4">
                            <div className="mt-1 flex-shrink-0">
                                {renderPlatformIcon(post.platform)}
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="line-clamp-2 text-sm text-gray-800">{post.content}</p>
                                <div className="mt-2 flex items-center text-xs text-gray-500">
                                    <span>{new Date(post.scheduledAt).toLocaleDateString()}</span>
                                    <span className="mx-1">•</span>
                                    <span>{(post.engagement || 0).toLocaleString()} views</span>
                                </div>
                            </div>
                            <div className="flex-shrink-0">
                                <span
                                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusClass(post.status)}`}
                                >
                                    {renderStatusIcon(post.status)}
                                    <span className="ml-1">{post.status}</span>
                                </span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="mt-4">
                <Link href="/posts" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                    View all videos
                </Link>
            </div>
        </div>
    );
}
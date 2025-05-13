import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { ExternalLink, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function PerformanceTable() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchYouTubeVideos = async () => {
            try {
                const response = await axios.get('/api/youtube/videos');
                console.log(response.data);

                // Transform YouTube API response to match your table structure
                const youtubePosts = response.data.videos.map((video, index) => ({
                    id: video.id || `yt-${index}`,
                    content: video.title || 'YouTube Video',
                    platform: 'youtube',
                    engagement: video.stats.likes || 0,
                    impressions: video.stats.views || 0,
                    engagementRate: video.stats.likes && video.stats.views ? `${((video.stats.likes / video.stats.views) * 100).toFixed(1)}%` : '0%',
                    date: video.published_at
                        ? new Date(video.published_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                          })
                        : 'Unknown date',
                    thumbnail: video.thumbnail,
                    url: video.url,
                }));

                setPosts(youtubePosts);
            } catch (err) {
                setError('Failed to load YouTube videos');
                console.error('Error fetching videos:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchYouTubeVideos();
    }, []);

    const getPlatformIcon = (platform: string) => {
        switch (platform.toLowerCase()) {
            case 'facebook':
                return <Facebook className="h-4 w-4 text-blue-600" />;
            case 'instagram':
                return <Instagram className="h-4 w-4 text-pink-600" />;
            case 'twitter':
                return <Twitter className="h-4 w-4 text-blue-400" />;
            case 'youtube':
                return <Youtube className="h-4 w-4 text-red-600" />;
            default:
                return null;
        }
    };

    if (loading) return <div className="p-4 text-center">Loading performance data...</div>;
    if (error) return <div className="p-4 text-center text-gray-500">Failed to load</div>;
    if (posts.length === 0) return <div className="p-4 text-center text-gray-500">No videos found</div>;

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b">
                        <th className="px-4 py-3 text-left text-sm font-medium">Post</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Platform</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Engagement</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Impressions</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Eng. Rate</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                        <tr key={post.id} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-3">
                                <div className="flex items-start gap-3">
                                    <Avatar className="mt-1 h-8 w-8">
                                        <AvatarImage src={post.thumbnail || '/placeholder.svg?height=32&width=32'} alt="Post" />
                                        <AvatarFallback>YT</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="line-clamp-2 text-sm">{post.content}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex items-center">{getPlatformIcon(post.platform)}</div>
                            </td>
                            <td className="px-4 py-3 text-sm">{post.engagement.toLocaleString()}</td>
                            <td className="px-4 py-3 text-sm">{post.impressions.toLocaleString()}</td>
                            <td className="px-4 py-3 text-sm">{post.engagementRate}</td>
                            <td className="px-4 py-3 text-sm">{post.date}</td>
                            <td className="px-4 py-3">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                                    <a href={post.url} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="h-4 w-4" />
                                    </a>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

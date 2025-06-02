import { useState, useEffect } from 'react';
import axios from 'axios';
import { Play, ThumbsUp, MessageSquare, Eye, Calendar, Share2 } from 'lucide-react';

interface Video {
  video_id: string;
  title: string;
  description: string;
  published_at: string;
  thumbnail: string;
  url: string;
  stats: {
    views: string;
    likes: string;
    comments: string;
  };
}

interface FacebookPost {
  id: string;
  message?: string;
  created_time: string;
  permalink_url: string;
  full_picture?: string;
  insights?: {
    data: Array<{
      name: string;
      values: Array<{ value: number }>;
    }>;
  };
  shares?: {
    count: number;
  };
}

export default function SocialPosts() {
  const [activeTab, setActiveTab] = useState<'youtube' | 'facebook'>('youtube');
  const [youtubeVideos, setYoutubeVideos] = useState<Video[]>([]);
  const [facebookPosts, setFacebookPosts] = useState<FacebookPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');
        
        if (activeTab === 'youtube') {
          const response = await axios.get('/api/youtube/videos');
          setYoutubeVideos(response.data.videos);
        } else {
          // First get the Facebook pages
          const pagesResponse = await axios.get('/api/facebook/pages');
          const pages = pagesResponse.data.data;
          console.log(pages);
          
          
          if (pages.length > 0) {
            // Use the first page ID to get posts
            const pageId = pages[0].id;
            console.log(pageId);
            
            const postsResponse = await axios.get(`/api/facebook/${pageId}/posts`);
            setFacebookPosts(postsResponse.data.data || []);
          } else {
            setFacebookPosts([]);
          }
        }
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getImpressions = (post: FacebookPost) => {
    if (!post.insights?.data) return 'N/A';
    const impressions = post.insights.data.find(i => i.name === 'post_impressions');
    return impressions?.values[0]?.value || 'N/A';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('youtube')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'youtube'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            YouTube Posts
          </button>
          <button
            onClick={() => setActiveTab('facebook')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'facebook'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Facebook Posts
          </button>
        </nav>
      </div>

      {/* Content Area */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${
            activeTab === 'youtube' ? 'border-red-600' : 'border-blue-600'
          }`}></div>
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === 'youtube' ? (
            youtubeVideos.length > 0 ? (
              youtubeVideos.map((video) => (
                <div key={video.video_id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-600 hover:bg-red-700 text-white rounded-full p-3"
                      >
                        <Play className="h-6 w-6" />
                      </a>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-red-600 transition-colors"
                      >
                        {video.title}
                      </a>
                    </h3>
                    
                    {video.description && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {video.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {video.stats.views}
                        </span>
                        <span className="flex items-center">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          {video.stats.likes}
                        </span>
                        <span className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          {video.stats.comments}
                        </span>
                      </div>
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(video.published_at)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <div className="mx-auto h-24 w-24 text-gray-400">
                  <Play className="w-full h-full" />
                </div>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No YouTube videos found</h3>
                <p className="mt-1 text-gray-500">You haven't posted any YouTube videos yet.</p>
              </div>
            )
          ) : (
            facebookPosts.length > 0 ? (
              facebookPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  {post.full_picture && (
                    <img
                      src={post.full_picture}
                      alt="Facebook post"
                      className="w-full h-48 object-cover"
                    />
                  )}
                  
                  <div className="p-4">
                    {post.message && (
                      <div className="mb-3">
                        <h3 className="font-semibold text-lg mb-1">Facebook Post</h3>
                        <p className="text-gray-600 text-sm line-clamp-3">
                          {post.message}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {getImpressions(post)}
                        </span>
                        <span className="flex items-center">
                          <Share2 className="h-4 w-4 mr-1" />
                          {post.shares?.count || 0}
                        </span>
                      </div>
                      <a
                        href={post.permalink_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(post.created_time)}
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <div className="mx-auto h-24 w-24 text-gray-400">
                  <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
                  </svg>
                </div>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No Facebook posts found</h3>
                <p className="mt-1 text-gray-500">You haven't posted on Facebook yet.</p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
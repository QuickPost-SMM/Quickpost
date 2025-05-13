import axios from 'axios';
import { useEffect, useState } from 'react';

type Post = {
    id: string;
    message?: string;
    created_time: string;
};

interface FacebookPostsProps {
    pageId: string;
}

export default function FacebookPosts({ pageId }: FacebookPostsProps) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios
            .get(`/api/facebook/${pageId}/posts`)
            .then((res) => {setPosts(res.data.data || [])
                console.log(res.data);
            })
            .catch((err) => setError(err.response?.data?.error?.message || 'Failed to fetch posts'));
    }, [pageId]);
    // useEffect(() => {
    //     axios
    //         .get(`/api/facebook/${pageId}/analytics`)
    //         .then((res) => console.log('Analytics:', res.data))
    //         .catch((err) => console.error('Analytics error:', err.response?.data || err.message));
    // }, [pageId]);

    return (
        <div className="mt-4">
            <h3 className="text-md font-bold">Recent Posts</h3>
            {error && <p className="text-red-500">{error}</p>}
            <ul className="mt-2 space-y-2">
                {posts.map((post) => (
                    <li key={post.id} className="rounded border bg-gray-50 p-2">
                        <p>{post.message || '[No Message]'}</p>
                        <small className="text-gray-500">{new Date(post.created_time).toLocaleString()}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
}

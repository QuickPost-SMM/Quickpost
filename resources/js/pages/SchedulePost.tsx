import NavBar from '@/layouts/NavBar';
import { Inertia } from '@inertiajs/inertia';
import { Head, Link } from '@inertiajs/react';
import { Calendar, Clock, Edit, Facebook, Instagram, MoreVertical, Trash2, Twitter, Youtube } from 'lucide-react';
import { useState } from 'react';

interface Post {
    id: number;
    content: string;
    platforms: string[];
    scheduledAt: string;
    hasMedia: boolean;
}

interface ScheduleProps {
    posts: Post[];
}

export default function SchedulePost() {
    const posts = [
        {
            id: 1,
            content: 'Launching our new product today! Stay tuned.',
            platforms: ['Twitter', 'Facebook'],
            scheduledAt: '2025-05-05T10:30:00Z',
            hasMedia: true,
        },
        {
            id: 2,
            content: 'Check out our latest blog post on productivity tips.',
            platforms: ['YouTube', 'Instagram'],
            scheduledAt: '2025-05-06T15:45:00Z',
            hasMedia: false,
        },
        {
            id: 3,
            content: 'Don’t miss our weekend sale! Big discounts await.',
            platforms: ['Facebook', 'Instagram'],
            scheduledAt: '2025-05-07T09:00:00Z',
            hasMedia: true,
        },
        {
            id: 4,
            content: 'Join our live Q&A session with the CEO tomorrow!',
            platforms: ['Twitter', 'YouTube'],
            scheduledAt: '2025-05-08T17:30:00Z',
            hasMedia: false,
        },
    ];
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

    const toggleDropdown = (postId: number) => {
        setActiveDropdown(activeDropdown === postId ? null : postId);
    };

    const handleEdit = (postId: number) => {
        Inertia.visit(`/posts/${postId}/edit`);
    };

    const handleDelete = (postId: number) => {
        if (confirm('Are you sure you want to delete this post?')) {
            Inertia.delete(`/posts/${postId}`);
        }
    };

    const renderPlatformIcon = (platform: string) => {
        switch (platform.toLowerCase()) {
            case 'twitter':
                return <Twitter className="h-4 w-4 text-blue-400" />;
            case 'facebook':
                return <Facebook className="h-4 w-4 text-blue-600" />;
            case 'instagram':
                return <Instagram className="h-4 w-4 text-pink-500" />;
            case 'YouTube':
                return <Youtube className="h-4 w-4 text-blue-700" />;
            default:
                return null;
        }
    };

    const formatScheduledDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const formatScheduledTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <NavBar title="Scheduled Posts">
            <Head title="Scheduled Posts" />

            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Upcoming Posts</h2>
                <Link
                    href="/posts/create"
                    className="rounded-md bg-blue-600 px-4 py-2 text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                >
                    Create New Post
                </Link>
            </div>

            <div className="overflow-hidden rounded-lg bg-white shadow">
                {posts.length === 0 ? (
                    <div className="p-6 text-center">
                        <p className="text-gray-500">No scheduled posts found.</p>
                        <Link href="/posts/create" className="mt-2 inline-block text-blue-600 hover:text-blue-500">
                            Create your first post
                        </Link>
                    </div>
                ) : (
                    <ul className="divide-y divide-gray-200">
                        {posts.map((post) => (
                            <li key={post.id} className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="min-w-0 flex-1">
                                        <p className="mb-2 line-clamp-2 text-sm text-gray-900">{post.content}</p>
                                        <div className="flex items-center text-xs text-gray-500">
                                            <div className="mr-4 flex items-center">
                                                <Calendar className="mr-1 h-4 w-4" />
                                                {formatScheduledDate(post.scheduledAt)}
                                            </div>
                                            <div className="flex items-center">
                                                <Clock className="mr-1 h-4 w-4" />
                                                {formatScheduledTime(post.scheduledAt)}
                                            </div>
                                        </div>
                                        <div className="mt-2 flex space-x-1">
                                            {post.platforms.map((platform) => (
                                                <div key={platform} className="flex-shrink-0">
                                                    {renderPlatformIcon(platform)}
                                                </div>
                                            ))}
                                            {post.hasMedia && (
                                                <span className="ml-2 inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">
                                                    Media
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="relative ml-4 flex-shrink-0">
                                        <button
                                            onClick={() => toggleDropdown(post.id)}
                                            className="rounded-full p-1 hover:bg-gray-100 focus:outline-none"
                                        >
                                            <MoreVertical className="h-5 w-5 text-gray-500" />
                                        </button>

                                        {activeDropdown === post.id && (
                                            <div className="absolute right-0 z-10 mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg">
                                                <div className="py-1">
                                                    <button
                                                        onClick={() => handleEdit(post.id)}
                                                        className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(post.id)}
                                                        className="flex w-full items-center px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </NavBar>
    );
}

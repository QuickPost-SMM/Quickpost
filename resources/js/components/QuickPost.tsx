import { Inertia } from '@inertiajs/inertia';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';

export default function QuickPost() {
    const [content, setContent] = useState('');
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const platforms = [
        { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-500' },
        { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'text-blue-600' },
        { id: 'YouTube', name: 'YouTube', icon: Youtube, color: 'text-blue-700' },
        { id: 'tiktok', name: 'Tiktok', icon: Twitter, color: 'text-blue-400' },
    ];

    const togglePlatform = (platformId: string) => {
        setSelectedPlatforms((prev) => (prev.includes(platformId) ? prev.filter((id) => id !== platformId) : [...prev, platformId]));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (content.trim() === '' || selectedPlatforms.length === 0) {
            return;
        }

        setIsSubmitting(true);

        // In a real app, you would use Inertia to submit to your Laravel backend
        Inertia.post(
            '/posts',
            {
                content,
                platforms: selectedPlatforms,
                publish_now: true,
            },
            {
                onSuccess: () => {
                    setContent('');
                    setSelectedPlatforms([]);
                    setIsSubmitting(false);
                },
                onError: () => {
                    setIsSubmitting(false);
                },
            },
        );
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What's on your mind?"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                    rows={4}
                ></textarea>
                <div className="mt-1 text-right text-xs text-gray-500">{content.length}/280 characters</div>
            </div>

            <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-700">Select platforms</label>
                <div className="flex flex-wrap gap-2">
                    {platforms.map((platform) => (
                        <button
                            key={platform.id}
                            type="button"
                            onClick={() => togglePlatform(platform.id)}
                            className={`flex items-center rounded-full border px-3 py-1.5 text-sm font-medium ${
                                selectedPlatforms.includes(platform.id)
                                    ? 'border-blue-300 bg-blue-50 text-blue-700'
                                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                            } `}
                        >
                            <platform.icon className={`mr-1.5 h-4 w-4 ${platform.color}`} />
                            {platform.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={isSubmitting || content.trim() === '' || selectedPlatforms.length === 0}
                    className="rounded-md bg-blue-600 px-4 py-2 text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
                >
                    {isSubmitting ? 'Posting...' : 'Post Now'}
                </button>
            </div>
        </form>
    );
}

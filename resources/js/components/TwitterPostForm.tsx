// resources/js/Components/TwitterPostForm.tsx
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { X } from 'lucide-react';

export default function TwitterPostForm() {
    const [mediaPreview, setMediaPreview] = useState<string | null>(null);
    const { data, setData, post, processing, errors } = useForm({
        content: '',
        media: null
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/api/twitter/post', {
            onSuccess: () => {
                setData({ content: '', media: null });
                setMediaPreview(null);
            },
            forceFormData: true
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData('media', file);
            
            const reader = new FileReader();
            reader.onload = () => setMediaPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
                value={data.content}
                onChange={(e) => setData('content', e.target.value)}
                placeholder="What's happening?"
                className="min-h-[100px]"
                maxLength={280}
            />
            <div className="flex items-center justify-between">
                <div>
                    <input
                        type="file"
                        id="media-upload"
                        className="hidden"
                        accept="image/*,video/mp4"
                        onChange={handleFileChange}
                    />
                    <label
                        htmlFor="media-upload"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
                    >
                        Add Media
                    </label>
                </div>
                <Button
                    type="submit"
                    disabled={processing || !data.content.trim()}
                    className="bg-blue-500 hover:bg-blue-600"
                >
                    {processing ? 'Posting...' : 'Post to Twitter'}
                </Button>
            </div>
            
            {mediaPreview && (
                <div className="mt-4 relative">
                    {data.media?.type.startsWith('image/') ? (
                        <img 
                            src={mediaPreview} 
                            alt="Preview" 
                            className="max-h-60 rounded-lg"
                        />
                    ) : (
                        <video 
                            src={mediaPreview} 
                            controls 
                            className="max-h-60 rounded-lg"
                        />
                    )}
                    <button
                        type="button"
                        onClick={() => {
                            setMediaPreview(null);
                            setData('media', null);
                        }}
                        className="absolute top-2 right-2 bg-gray-800 rounded-full p-1 text-white hover:bg-gray-700"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            )}

            {errors.content && <p className="text-red-500">{errors.content}</p>}
            {errors.media && <p className="text-red-500">{errors.media}</p>}
        </form>
    );
}
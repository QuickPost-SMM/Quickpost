import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { Calendar, CheckCircle, Clock, ImagesIcon, Paperclip, Send, X, XCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
    return (
        <div
            className={`fixed top-4 right-4 z-50 flex items-center rounded-lg p-4 ${type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}
        >
            {type === 'success' ? <CheckCircle className="mr-2 h-5 w-5" /> : <XCircle className="mr-2 h-5 w-5" />}
            <div className="text-sm font-medium">{message}</div>
            <button onClick={onClose} className="ml-4 text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
            </button>
        </div>
    );
}

interface FacebookPage {
    id: string;
    name: string;
    access_token: string;
}

interface Channel {
    id: string;
    platform: string;
    name: string;
    username: string;
    avatar: string;
}

interface PostPageProps {
    channels: Channel[];
}

export function PostPage({ channels }: PostPageProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    // const [videoFile, setVideoFile] = useState<File | null>(null);
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [selectedMediaType, setSelectedMediaType] = useState<'video' | 'image' | null>(null);

    const [isScheduled, setIsScheduled] = useState(false);
    const [scheduleDate, setScheduleDate] = useState('');
    const [scheduleTime, setScheduleTime] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    // Platform selection based on connected channels
    const [selectedPlatforms, setSelectedPlatforms] = useState<Record<string, boolean>>({});
    const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([]);

    // Facebook pages
    const [facebookPages, setFacebookPages] = useState<FacebookPage[]>([]);
    const [selectedFacebookPage, setSelectedFacebookPage] = useState('');
    const [loadingPages, setLoadingPages] = useState(false);

    // Initialize platforms from connected channels
    useEffect(() => {
        const platforms = channels.reduce((acc, channel) => {
            if (!acc.includes(channel.platform.toLowerCase())) {
                acc.push(channel.platform.toLowerCase());
            }
            return acc;
        }, [] as string[]);

        setConnectedPlatforms(platforms);

        // Initialize selected platforms (default all to true)
        const initialSelected = platforms.reduce(
            (acc, platform) => {
                acc[platform] = true;
                return acc;
            },
            {} as Record<string, boolean>,
        );

        setSelectedPlatforms(initialSelected);
    }, [channels]);

    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 6000);
    };

    // Load Facebook pages when Facebook is selected and connected
    useEffect(() => {
        if (selectedPlatforms.facebook && connectedPlatforms.includes('facebook') && facebookPages.length === 0) {
            setLoadingPages(true);
            axios
                .get('/api/facebook/pages')
                .then((response) => {
                    setFacebookPages(response.data);
                    if (response.data.length > 0) {
                        setSelectedFacebookPage(response.data[0].id);
                    }
                })
                .catch((error) => {
                    showToast('Failed to load Facebook pages', 'error');
                    console.error(error);
                })
                .finally(() => setLoadingPages(false));
        }
    }, [selectedPlatforms.facebook, connectedPlatforms]);

    const handlePlatformToggle = (platform: string) => {
        setSelectedPlatforms((prev) => ({
            ...prev,
            [platform]: !prev[platform],
        }));
    };

    // const handleVideoUpload = () => {
    //     fileInputRef.current?.click();
    // };

    const handleImageUpload = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e: Event) => {
            const target = e.target as HTMLInputElement;
            if (target.files && target.files[0]) {
                const file = target.files[0];
                if (file.type.startsWith('image/')) {
                    setImageFile(file);
                    setVideoFile(null);
                    setSelectedMediaType('image');
                }
            }
        };
        input.click();
    };

    const handleVideoUpload = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'video/*';
        input.onchange = (e: Event) => {
            const target = e.target as HTMLInputElement;
            if (target.files && target.files[0]) {
                const file = target.files[0];
                if (file.type.startsWith('video/')) {
                    setVideoFile(file);
                    setImageFile(null);
                    setSelectedMediaType('video');
                }
            }
        };
        input.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.type.startsWith('video/')) {
                setVideoFile(file);
            }
        }
    };

    const [scheduleDateTime, setScheduleDateTime] = useState<Date | null>(null);

    const handleScheduleChange = (date: string, time: string) => {
        if (date && time) {
            const [hours, minutes] = time.split(':');
            const newDate = new Date(date);
            newDate.setHours(parseInt(hours, 10));
            newDate.setMinutes(parseInt(minutes, 10));

            const minTime = new Date(Date.now() + 15 * 60 * 1000);
            if (newDate < minTime) {
                showToast('Scheduled time must be at least 15 minutes in the future', 'error');
                return;
            }

            setScheduleDateTime(newDate);
        }
    };

    const handleSubmit = async () => {
        if (!title) {
            showToast('Title is required', 'error');
            return;
        }

        // Video is required only if YouTube is selected and connected
        if (selectedPlatforms.youtube && connectedPlatforms.includes('youtube') && !videoFile) {
            showToast('Video file is required for YouTube', 'error');
            return;
        }

        // Check at least one platform is selected
        if (!Object.entries(selectedPlatforms).some(([platform, selected]) => selected && connectedPlatforms.includes(platform))) {
            showToast('Please select at least one platform', 'error');
            return;
        }

        // Check Facebook page is selected if Facebook is chosen
        if (selectedPlatforms.facebook && connectedPlatforms.includes('facebook') && !selectedFacebookPage) {
            showToast('Please select a Facebook page', 'error');
            return;
        }

        const platformsArray = Object.entries(selectedPlatforms)
            .filter(([_, isSelected]) => isSelected)
            .map(([platform]) => platform);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);

        if (videoFile) {
            formData.append('file', videoFile);
        }

        // if (selectedPlatforms.youtube && connectedPlatforms.includes('youtube') && videoFile) {
        //     formData.append('video', videoFile);
        // }

        if (selectedPlatforms.facebook && connectedPlatforms.includes('facebook')) {
            if (videoFile) {
                formData.append('video', videoFile);
            } else if (imageFile) {
                formData.append('image', imageFile);
            }
        }

        platformsArray.forEach((platform) => {
            formData.append('platforms[]', platform);
        });

        if (selectedPlatforms.facebook && connectedPlatforms.includes('facebook')) {
            formData.append('facebook_page_id', selectedFacebookPage);
        }

        if (isScheduled && scheduleDate && scheduleTime) {
            const scheduledAt = new Date(`${scheduleDate}T${scheduleTime}`);
            const isoString = scheduledAt.toISOString();
            const minTime = new Date(Date.now() + 15 * 60 * 1000);

            if (scheduledAt < minTime) {
                showToast('Scheduled time must be at least 15 minutes in the future', 'error');
                return;
            }

            formData.append('scheduledAt', isoString);
        }

        try {
            setIsSubmitting(true);
            for (const [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }
            const response = await axios.post('/api/publish', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response);

            showToast(
                isScheduled ? `Content scheduled for ${new Date(response.data.scheduled_at).toLocaleString()}` : 'Content published successfully!',
                'success',
            );
            resetForm();
        } catch (error) {
            if (error) {
                console.log(error);
            } else if (error.response?.status === 422) {
                showToast('Invalid schedule time format', 'error');
            } else {
                showToast(error.response?.data?.message || 'Failed to publish content', 'error');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setVideoFile(null);
        setIsScheduled(false);
        setImageFile(null);
        setSelectedMediaType(null);
        // Reset selected platforms to all connected
        const resetSelected = connectedPlatforms.reduce(
            (acc, platform) => {
                acc[platform] = true;
                return acc;
            },
            {} as Record<string, boolean>,
        );
        setSelectedPlatforms(resetSelected);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const getPlatformIcon = (platform: string) => {
        switch (platform.toLowerCase()) {
            case 'facebook':
                return (
                    <svg className="mr-2 h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 0C4.477 0 0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.879v-6.988h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10c0-5.523-4.477-10-10-10z" />
                    </svg>
                );
            case 'youtube':
                return (
                    <svg className="mr-2 h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 0C4.477 0 0 4.477 0 10c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10 0-5.523-4.477-10-10-10zm3.7 10.334l-4.2 2.4c-.4.2-.7-.1-.7-.5V7.666c0-.4.3-.7.7-.5l4.2 2.4c.4.2.4.7 0 .9z" />
                    </svg>
                );
            case 'instagram':
                return (
                    <svg className="mr-2 h-5 w-5 text-pink-600" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 0C7.284 0 6.944.01 5.878.06 4.813.11 4.088.28 3.45.53a4.9 4.9 0 00-1.772 1.153A4.9 4.9 0 00.53 3.45C.28 4.088.11 4.813.06 5.878.01 6.944 0 7.284 0 10s.01 3.056.06 4.122c.05 1.065.22 1.79.47 2.428a4.9 4.9 0 001.153 1.772 4.9 4.9 0 001.772 1.153c.638.25 1.363.42 2.428.47C6.944 19.99 7.284 20 10 20s3.056-.01 4.122-.06c1.065-.05 1.79-.22 2.428-.47a4.9 4.9 0 001.772-1.153 4.9 4.9 0 001.153-1.772c.25-.638.42-1.363.47-2.428.05-1.066.06-1.406.06-4.122s-.01-3.056-.06-4.122c-.05-1.065-.22-1.79-.47-2.428a4.9 4.9 0 00-1.153-1.772A4.9 4.9 0 0016.55.53c-.638-.25-1.363-.42-2.428-.47C13.056.01 12.716 0 10 0zm0 1.802c2.717 0 3.056.01 4.122.06.964.045 1.486.2 1.836.332.438.17.747.37 1.08.703.333.333.533.642.703 1.08.132.35.287.872.332 1.836.05 1.066.06 1.405.06 4.122s-.01 3.056-.06 4.122c-.045.964-.2 1.486-.332 1.836a3.1 3.1 0 01-.703 1.08 3.1 3.1 0 01-1.08.703c-.35.132-.872.287-1.836.332-1.066.05-1.405.06-4.122.06s-3.056-.01-4.122-.06c-.964-.045-1.486-.2-1.836-.332a3.1 3.1 0 01-1.08-.703 3.1 3.1 0 01-.703-1.08c-.132-.35-.287-.872-.332-1.836-.05-1.066-.06-1.405-.06-4.122s.01-3.056.06-4.122c.045-.964.2-1.486.332-1.836a3.1 3.1 0 01.703-1.08 3.1 3.1 0 011.08-.703c.35-.132.872-.287 1.836-.332C6.944 1.812 7.283 1.802 10 1.802zm0 3.396a4.8 4.8 0 100 9.6 4.8 4.8 0 000-9.6zm0 7.92a3.12 3.12 0 110-6.24 3.12 3.12 0 010 6.24zm6.24-7.92a1.44 1.44 0 100-2.88 1.44 1.44 0 000 2.88z" />
                    </svg>
                );
            default:
                return (
                    <svg className="mr-2 h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 0C4.477 0 0 4.477 0 10c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10 0-5.523-4.477-10-10-10zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
                    </svg>
                );
        }
    };

    const MediaPreview = () => {
        if (!selectedMediaType) return null;

        if (selectedMediaType === 'image' && imageFile) {
            return (
                <div className="mt-4">
                    <div className="relative">
                        <img src={URL.createObjectURL(imageFile)} alt="Preview" className="max-h-64 rounded-lg object-contain" />
                        <button
                            onClick={() => {
                                setImageFile(null);
                                setSelectedMediaType(null);
                            }}
                            className="absolute top-2 right-2 rounded-full bg-gray-800 p-1 text-white hover:bg-gray-700"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{imageFile.name}</p>
                </div>
            );
        }

        if (selectedMediaType === 'video' && videoFile) {
            return (
                <div className="mt-4">
                    <div className="relative">
                        <video src={URL.createObjectURL(videoFile)} controls className="max-h-64 rounded-lg" />
                        <button
                            onClick={() => {
                                setVideoFile(null);
                                setSelectedMediaType(null);
                            }}
                            className="absolute top-2 right-2 rounded-full bg-gray-800 p-1 text-white hover:bg-gray-700"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{videoFile.name}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="mx-auto max-w-4xl bg-blue-100 p-6">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <h1 className="mb-6 text-2xl font-bold">Create Post</h1>

            <div className="rounded-lg bg-white p-6 shadow">
                {/* Platform Selection - Only show connected channels */}
                {connectedPlatforms.length > 0 && (
                    <div className="mb-6">
                        <Label className="mb-2 block">Publish To</Label>
                        <div className="flex flex-wrap gap-4">
                            {connectedPlatforms.map((platform) => (
                                <div key={platform} className="flex items-center">
                                    <input
                                        id={`${platform}-platform`}
                                        type="checkbox"
                                        checked={!!selectedPlatforms[platform]}
                                        onChange={() => handlePlatformToggle(platform)}
                                        className="h-4 w-4 rounded border-gray-300 focus:ring-2"
                                        style={{
                                            color:
                                                platform === 'youtube'
                                                    ? '#FF0000'
                                                    : platform === 'facebook'
                                                      ? '#1877F2'
                                                      : platform === 'instagram'
                                                        ? '#E1306C'
                                                        : '#6B7280',
                                        }}
                                    />
                                    <Label htmlFor={`${platform}-platform`} className="ml-2 flex items-center">
                                        {getPlatformIcon(platform)}
                                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                                    </Label>
                                </div>
                            ))}
                        </div>

                        {/* Facebook Page Selector (only shown when Facebook is selected and connected) */}
                        <div className="mb-6 mt-7">
                            <div className="flex flex-wrap gap-3">
                                <Button variant="outline" type="button" onClick={handleImageUpload} className="flex items-center gap-2">
                                    <ImagesIcon className="h-4 w-4" />
                                    <span>Upload Image</span>
                                </Button>
                                <Button variant="outline" type="button" onClick={handleVideoUpload} className="flex items-center gap-2">
                                    <Paperclip className="h-4 w-4" />
                                    <span>Upload Video</span>
                                </Button>
                            </div>
                            <MediaPreview />
                        </div>
                    </div>
                )}

                <div className="mb-6">
                    <Label htmlFor="title" className="mb-2 block">Post Title</Label>
                    <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" className="w-full h-14" />
                </div>

                <div className="mb-6">
                    <Label htmlFor="description" className="mb-2 block">
                        Description
                    </Label>
                    <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description"
                        rows={5}
                        className="w-full"
                    />
                </div>

                {/* Show video upload only if YouTube is selected and connected */}

                <div className="mb-6">
                    <div className="flex items-center">
                        <input
                            id="schedule-toggle"
                            type="checkbox"
                            checked={isScheduled}
                            onChange={() => setIsScheduled(!isScheduled)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <Label htmlFor="schedule-toggle" className="ml-2">
                            Schedule for later
                        </Label>
                    </div>

                    {isScheduled && (
                        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <Label htmlFor="schedule-date" className="mb-2 block">
                                    Date
                                </Label>
                                <div className="relative">
                                    <Input
                                        type="date"
                                        id="schedule-date"
                                        value={scheduleDate}
                                        onChange={(e) => {
                                            setScheduleDate(e.target.value);
                                            handleScheduleChange(e.target.value, scheduleTime);
                                        }}
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                    <Calendar className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="schedule-time" className="mb-2 block">
                                    Time
                                </Label>
                                <div className="relative">
                                    <Input
                                        type="time"
                                        id="schedule-time"
                                        value={scheduleTime}
                                        onChange={(e) => {
                                            setScheduleTime(e.target.value);
                                            handleScheduleChange(scheduleDate, e.target.value);
                                        }}
                                    />
                                    <Clock className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
                                </div>
                            </div>
                            {scheduleDateTime && (
                                <div className="col-span-2 text-sm text-gray-600">Scheduled for: {scheduleDateTime.toLocaleString()}</div>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={resetForm} disabled={isSubmitting}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={
                            isSubmitting ||
                            !title ||
                            (selectedPlatforms.youtube && connectedPlatforms.includes('youtube') && !videoFile) ||
                            !Object.entries(selectedPlatforms).some(([platform, selected]) => selected && connectedPlatforms.includes(platform))
                        }
                        className="flex items-center gap-2"
                    >
                        <Send className="h-4 w-4" />
                        {isSubmitting ? 'Publishing...' : isScheduled ? 'Schedule Post' : 'Publish Now'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

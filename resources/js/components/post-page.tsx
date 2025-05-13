import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { Calendar, CheckCircle, Clock, Paperclip, Send, X, XCircle, Youtube } from 'lucide-react';
import { useRef, useState } from 'react';

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

export function PostPage() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [isScheduled, setIsScheduled] = useState(false);
    const [scheduleDate, setScheduleDate] = useState('');
    const [scheduleTime, setScheduleTime] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleVideoUpload = () => {
        fileInputRef.current?.click();
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

    // Replace your existing schedule states with:
    const handleScheduleChange = (date: string, time: string) => {
        if (date && time) {
            const [hours, minutes] = time.split(':');
            const newDate = new Date(date);
            newDate.setHours(parseInt(hours, 10));
            newDate.setMinutes(parseInt(minutes, 10));

            // Ensure time is at least 15 minutes in the future (YouTube requirement)
            const minTime = new Date(Date.now() + 15 * 60 * 1000);
            if (newDate < minTime) {
                showToast('Scheduled time must be at least 15 minutes in the future', 'error');
                return;
            }

            setScheduleDateTime(newDate);
        }
    };

    // Update your handleSubmit function
    const handleSubmit = async () => {
        if (!title || !videoFile) {
            showToast('Title and video file are required', 'error');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('file', videoFile);

        if (isScheduled && scheduleDate && scheduleTime) {
            // Combine date and time into ISO format with UTC timezone
            const scheduledAt = new Date(`${scheduleDate}T${scheduleTime}`);
            const isoString = scheduledAt.toISOString(); // This creates the correct format

            // Validate minimum 15 minutes in future
            const minTime = new Date(Date.now() + 15 * 60 * 1000);
            if (scheduledAt < minTime) {
                showToast('Scheduled time must be at least 15 minutes in the future', 'error');
                return;
            }

            formData.append('scheduledAt', isoString);
        }

        try {
            setIsSubmitting(true);
            const response = await axios.post('/api/youtube/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            showToast(
                isScheduled ? `Video scheduled for ${new Date(response.data.scheduled_at).toLocaleString()}` : 'Video published successfully!',
                'success',
            );
            resetForm();
        } catch (error) {
            if (error.response?.status === 422) {
                showToast('Invalid schedule time format', 'error');
            } else {
                showToast(error.response?.data?.message || 'Failed to publish video', 'error');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    // const handleSubmit = async () => {
    //     if (!title || !videoFile) {
    //         showToast('Title and video file are required', 'error');
    //         return;
    //     }

    //     const formData = new FormData();
    //     formData.append('title', title);
    //     formData.append('description', description);
    //     formData.append('file', videoFile);
    //     if (isScheduled) {
    //         formData.append('scheduledAt', `${scheduleDate}T${scheduleTime}:00Z`);
    //     }

    //     try {
    //         setIsSubmitting(true);

    //         const response = await axios.post('/api/youtube/upload', formData);
    //         showToast(response.data.message || 'Video published successfully!', 'success');
    //         resetForm();
    //     } catch (error) {
    //         showToast(error.response?.data?.message || 'Failed to publish video', 'error');
    //     } finally {
    //         setIsSubmitting(false);
    //     }
    // };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setVideoFile(null);
        setIsScheduled(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="mx-auto max-w-4xl p-6 bg-blue-100">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <h1 className="mb-6 text-2xl font-bold">Create Post</h1>

            <div className="rounded-lg bg-white p-6 shadow">
                <div className="mb-6">
                    <Label htmlFor="title" className="mb-2 block">
                        Video Title *
                    </Label>
                    <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter video title" className="w-full" />
                </div>

                <div className="mb-6">
                    <Label htmlFor="description" className="mb-2 block">
                        Description
                    </Label>
                    <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter video description"
                        rows={5}
                        className="w-full"
                    />
                </div>

                <div className="mb-6">
                    <Label className="mb-2 block">Media</Label>
                    <div className="flex flex-wrap gap-3">
                        <Button variant="outline" type="button" onClick={handleVideoUpload} className="flex items-center gap-2">
                            <Paperclip className="h-4 w-4" />
                            <span>Upload Video</span>
                            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="video/*" className="hidden" />
                        </Button>
                    </div>

                    {videoFile && (
                        <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                            <Youtube className="h-5 w-5 text-red-600" />
                            <span>{videoFile.name}</span>
                            {/* <span>({(videoFile.size / (1024 * 1024).toFixed(2)} MB)</span> */}
                        </div>
                    )}
                </div>

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
                    <Button onClick={handleSubmit} disabled={isSubmitting || !title || !videoFile} className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        {isSubmitting ? 'Publishing...' : isScheduled ? 'Schedule Video' : 'Publish Now'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

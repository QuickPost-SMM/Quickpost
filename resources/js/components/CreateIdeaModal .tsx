import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import axios from 'axios';
import { Check, ChevronDown, ChevronUp, Copy, ImageIcon, SmileIcon, Wand2, X } from 'lucide-react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

interface CreateIdeaModalProps {
    open: boolean;
    onClose: () => void;
}
interface AIAssistantProps {
    onClose: () => void;
    onApply: (content: string) => void;
    initialContent?: string;
}

// AI Assistant Component
function AIAssistant({ onClose, onApply, initialContent = '' }: AIAssistantProps) {
    const [prompt, setPrompt] = useState(initialContent);
    const [response, setResponse] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [copied, setCopied] = useState(false);
    const [promptHistory, setPromptHistory] = useState<string[]>([]);
    const [showHistory, setShowHistory] = useState(false);
    const [notification, setNotification] = useState<string | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const notificationTimer = useRef<NodeJS.Timeout>();

    const cleanResponse = (text: string) => {
        return text
            .replace(/\*\*/g, '') // Remove **bold** markers
            .replace(/\*/g, '') // Remove * markers
            .replace(/^\s*-\s*/gm, '') // Remove bullet points ( - )
            .trim();
    };
    const getFirstLines = (text: string, lines = 8) => {
        return text.split('\n').slice(0, lines).join('\n');
    };

    // Focus textarea and load history on mount
    useEffect(() => {
        textareaRef.current?.focus();
        return () => {
            if (notificationTimer.current) clearTimeout(notificationTimer.current);
        };
    }, []);

    const showNotification = (message: string) => {
        setNotification(message);
        if (notificationTimer.current) clearTimeout(notificationTimer.current);
        notificationTimer.current = setTimeout(() => setNotification(null), 3000);
    };

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            showNotification('Please enter a description');
            return;
        }

        setIsGenerating(true);
        setResponse('');
        try {
            const result = await axios.post('/api/ai/generate', {
                prompt: `As a social media expert, create engaging content about: ${prompt}`,
            });
            setResponse(cleanResponse(result.data.content));
            setPromptHistory((prev) => [prompt, ...prev.slice(0, 4)]);
        } catch (error) {
            console.error('AI generation failed:', error);
            showNotification('Failed to generate content');
        } finally {
            setIsGenerating(false);
        }
    };

    const copyToClipboard = () => {
        if (!response) return;
        navigator.clipboard.writeText(response);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        showNotification('Copied to clipboard!');
    };

    const applyContent = () => {
        if (!response) return;
        onApply(response);
        onClose();
        showNotification('Content applied!');
    };

    const insertFromHistory = (historicalPrompt: string) => {
        setPrompt(historicalPrompt);
        setShowHistory(false);
        textareaRef.current?.focus();
    };

    return (
        <DialogContent className="bg-white text-black sm:max-w-[700px]">
            {/* Notification */}
            {notification && <div className="fixed top-4 right-4 z-50 rounded-md bg-green-100 p-4 text-green-800">{notification}</div>}

            <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Wand2 className="h-5 w-5 text-purple-600" />
                        <span>AI Content Assistant</span>
                    </div>
                </DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
                <div className="relative">
                    <Textarea
                        ref={textareaRef}
                        placeholder="Describe your content (e.g., 'Instagram post about summer sale')"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="min-h-[120px] text-base"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                                handleGenerate();
                            }
                        }}
                    />

                    {promptHistory.length > 0 && (
                        <div className="absolute top-2 right-2">
                            <Button variant="ghost" size="sm" onClick={() => setShowHistory(!showHistory)} className="h-8 px-2">
                                {showHistory ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            </Button>
                        </div>
                    )}
                </div>

                {showHistory && promptHistory.length > 0 && (
                    <div className="rounded-md border bg-gray-50 p-2">
                        <h4 className="mb-2 text-sm font-medium">Recent Prompts</h4>
                        <ul className="space-y-1">
                            {promptHistory.map((item, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => insertFromHistory(item)}
                                        className="w-full rounded-sm p-2 text-left text-sm hover:bg-gray-100"
                                    >
                                        {item.length > 60 ? `${item.substring(0, 60)}...` : item}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <Button onClick={handleGenerate} disabled={isGenerating} className="w-full">
                    {isGenerating ? 'Generating...' : 'Generate Content'}
                </Button>

                {/* {response && (
                    <div className="rounded-md border bg-gray-50 p-4">
                        <div className="mb-3 flex items-center justify-between">
                            <h3 className="font-medium">AI Suggestion</h3>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="sm" onClick={copyToClipboard} className="h-8 w-8 p-0">
                                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>{copied ? 'Copied!' : 'Copy to clipboard'}</TooltipContent>
                            </Tooltip>
                        </div>
                        <div className="prose prose-sm max-w-none">
                            <p className="whitespace-pre-wrap">{response}</p>
                        </div>
                    </div>
                )} */}
                {response && (
                    <div className="rounded-md border bg-gray-50 p-4">
                        <div className="mb-3 flex items-center justify-between">
                            <h3 className="font-medium">AI Suggestion</h3>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="sm" onClick={copyToClipboard} className="h-8 w-8 p-0">
                                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>{copied ? 'Copied!' : 'Copy to clipboard'}</TooltipContent>
                            </Tooltip>
                        </div>
                        <div className="prose prose-sm max-w-none">
                            <p className="overflow-hidden whitespace-pre-wrap">
                                {getFirstLines(response)}
                                {response.split('\n').length > 8 && (
                                    <span className="mt-2 block text-sm text-gray-500">(Showing first 8 lines - copy to see full response)</span>
                                )}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex justify-between">
                <Button variant="outline" onClick={onClose}>
                    Close
                </Button>
                <div className="flex gap-2">
                    {response && (
                        <Button variant="outline" onClick={copyToClipboard} disabled={!response}>
                            {copied ? 'Copied!' : 'Copy'}
                        </Button>
                    )}
                    <Button onClick={applyContent} disabled={!response}>
                        Apply to Content
                    </Button>
                </div>
            </div>
        </DialogContent>
    );
}

export default function CreateIdeaModal({ open, onClose }: CreateIdeaModalProps) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState('unassigned');
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [showAIAssistant, setShowAIAssistant] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleSave = async () => {
        if (!title) {
            alert('Title is required');
            return;
        }

        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', content);
            formData.append('status', status);
            if (file) {
                formData.append('file', file);
            }

            await axios.post('/contents', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            resetForm();
            onClose();
        } catch (error) {
            console.error('Failed to save content:', error);
            alert('Failed to save content. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    const resetForm = () => {
        setTitle('');
        setContent('');
        setStatus('unassigned');
        setFile(null);
        setPreviewUrl(null);
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <>
            {/* Main Create Idea Dialog */}
            <Dialog open={open} onOpenChange={onClose}>
                <DialogContent className="text-b bg-white text-black sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Create Content</DialogTitle>
                        <div className="mt-2 flex items-center justify-between bg-white text-black">
                            <Select defaultValue={status} onValueChange={setStatus}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent className="bg-white text-black">
                                    <SelectItem value="unassigned">Unassigned</SelectItem>
                                    <SelectItem value="to-do">To Do</SelectItem>
                                    <SelectItem value="doing">In Progress</SelectItem>
                                    <SelectItem value="done">Done</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <Input
                            placeholder="Content title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="text-lg font-medium"
                            required
                        />

                        <Textarea
                            placeholder="Content description..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="min-h-[150px] bg-white"
                        />

                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
                        />

                        {previewUrl ? (
                            <div className="relative">
                                {file?.type.startsWith('image/') ? (
                                    <img src={previewUrl} alt="Preview" className="max-h-60 w-full rounded-md object-contain" />
                                ) : (
                                    <div className="flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed p-8">
                                        <p className="font-medium">{file?.name}</p>
                                        <p className="text-sm text-gray-500">{file?.type || 'Unknown file type'}</p>
                                    </div>
                                )}
                                <button
                                    onClick={() => {
                                        setFile(null);
                                        setPreviewUrl(null);
                                    }}
                                    className="absolute top-2 right-2 rounded-full bg-gray-800 p-1 text-white hover:bg-gray-700"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        ) : (
                            <div
                                onClick={triggerFileInput}
                                className="text-muted-foreground flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed p-8 hover:bg-gray-50"
                            >
                                <ImageIcon className="text-muted-foreground/50 h-10 w-10" />
                                <p>Drag & drop or click to upload</p>
                                <p className="text-sm text-gray-500">Supports images, videos, PDFs, and documents</p>
                            </div>
                        )}

                        <div className="flex items-center gap-2">
                            <Button className="bg-white text-black" variant="outline" size="icon" onClick={triggerFileInput}>
                                <ImageIcon className="h-4 w-4" />
                            </Button>
                            <Button className="bg-white text-black" variant="outline" size="icon">
                                <SmileIcon className="h-4 w-4" />
                            </Button>
                            <Button className="bg-white text-black" variant="outline" onClick={() => setShowAIAssistant(true)}>
                                AI Assistant
                            </Button>
                        </div>
                    </div>

                    <DialogFooter className="flex justify-between">
                        <Button className="bg-white text-black" variant="outline" onClick={resetForm}>
                            Clear
                        </Button>
                        <Button className="bg-white text-black" onClick={handleSave} disabled={isUploading}>
                            {isUploading ? 'Saving...' : 'Save Content'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Nested AI Assistant Dialog */}
            <Dialog open={showAIAssistant} onOpenChange={setShowAIAssistant}>
                <AIAssistant
                    onClose={() => setShowAIAssistant(false)}
                    onApply={(generatedContent) => {
                        setContent(generatedContent);
                        setShowAIAssistant(false);
                    }}
                    initialContent={content} // Pre-fill with current content
                />
            </Dialog>
        </>
    );
}

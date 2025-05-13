import ConnectChannelModal from '@/components/ConncetChanel';
import { PostPage } from '@/components/post-page';
import NavBar from '@/layouts/NavBar';
import { router } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

interface Channel {
    id: string;
    platform: string;
    name: string;
    username: string;
    avatar: string;
}

export default function Publish({ channels }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('queue');

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [selectedChannel, setSelectedChannel] = useState(null);
    const [disconnecting, setDisconnecting] = useState(false);

    const handleChannelClick = (channelId) => {
        setSelectedChannel(selectedChannel === channelId ? null : channelId);
    };

    const handleDisconnect = (channelId) => {
        if (confirm('Are you sure?')) {
            setDisconnecting(true);
            router.delete(route('channels.destroy', channelId), {
                onSuccess: () => router.reload(),
                onError: () => alert('Failed to disconnect'),
                onFinish: () => setDisconnecting(false),
            });
        }
    };
    const getPlatformIcon = (platform: string) => {
        switch (platform.toLowerCase()) {
            case 'facebook':
                return (
                    <svg className="mr-3 h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 0C4.477 0 0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.879v-6.988h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10c0-5.523-4.477-10-10-10z" />
                    </svg>
                );
            case 'instagram':
                return (
                    <svg className="mr-3 h-5 w-5 text-pink-600" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 0C7.284 0 6.944.01 5.878.06 4.813.11 4.088.28 3.45.53a4.9 4.9 0 00-1.772 1.153A4.9 4.9 0 00.53 3.45C.28 4.088.11 4.813.06 5.878.01 6.944 0 7.284 0 10s.01 3.056.06 4.122c.05 1.065.22 1.79.47 2.428a4.9 4.9 0 001.153 1.772 4.9 4.9 0 001.772 1.153c.638.25 1.363.42 2.428.47C6.944 19.99 7.284 20 10 20s3.056-.01 4.122-.06c1.065-.05 1.79-.22 2.428-.47a4.9 4.9 0 001.772-1.153 4.9 4.9 0 001.153-1.772c.25-.638.42-1.363.47-2.428.05-1.066.06-1.406.06-4.122s-.01-3.056-.06-4.122c-.05-1.065-.22-1.79-.47-2.428a4.9 4.9 0 00-1.153-1.772A4.9 4.9 0 0016.55.53c-.638-.25-1.363-.42-2.428-.47C13.056.01 12.716 0 10 0zm0 1.802c2.717 0 3.056.01 4.122.06.964.045 1.486.2 1.836.332.438.17.747.37 1.08.703.333.333.533.642.703 1.08.132.35.287.872.332 1.836.05 1.066.06 1.405.06 4.122s-.01 3.056-.06 4.122c-.045.964-.2 1.486-.332 1.836a3.1 3.1 0 01-.703 1.08 3.1 3.1 0 01-1.08.703c-.35.132-.872.287-1.836.332-1.066.05-1.405.06-4.122.06s-3.056-.01-4.122-.06c-.964-.045-1.486-.2-1.836-.332a3.1 3.1 0 01-1.08-.703 3.1 3.1 0 01-.703-1.08c-.132-.35-.287-.872-.332-1.836-.05-1.066-.06-1.405-.06-4.122s.01-3.056.06-4.122c.045-.964.2-1.486.332-1.836a3.1 3.1 0 01.703-1.08 3.1 3.1 0 011.08-.703c.35-.132.872-.287 1.836-.332C6.944 1.812 7.283 1.802 10 1.802zm0 3.396a4.8 4.8 0 100 9.6 4.8 4.8 0 000-9.6zm0 7.92a3.12 3.12 0 110-6.24 3.12 3.12 0 010 6.24zm6.24-7.92a1.44 1.44 0 100-2.88 1.44 1.44 0 000 2.88z" />
                    </svg>
                );
            case 'youtube':
                return (
                    <svg className="mr-3 h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 0C4.477 0 0 4.477 0 10c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10 0-5.523-4.477-10-10-10zm3.7 10.334l-4.2 2.4c-.4.2-.7-.1-.7-.5V7.666c0-.4.3-.7.7-.5l4.2 2.4c.4.2.4.7 0 .9z" />
                    </svg>
                );
            case 'tiktok':
                return (
                    <svg className="mr-3 h-5 w-5 text-black" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 0C4.477 0 0 4.477 0 10c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10 0-5.523-4.477-10-10-10zm3.7 10.334l-4.2 2.4c-.4.2-.7-.1-.7-.5V7.666c0-.4.3-.7.7-.5l4.2 2.4c.4.2.4.7 0 .9z" />
                    </svg>
                );
            default:
                return (
                    <svg className="mr-3 h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 0C4.477 0 0 4.477 0 10c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10 0-5.523-4.477-10-10-10zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
                    </svg>
                );
        }
    };

    return (
        <NavBar title="Publish Post">
            <div className="flex min-h-screen flex-col bg-white">
                {/* Top Navigation */}
                <div className="border-b border-gray-200">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between py-4">
                            <div className="flex items-center space-x-8"></div>
                            <div className="flex items-center space-x-4">
                                <button onClick={openModal} className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm text-white">
                                    <PlusIcon className="mr-1 h-4 w-4" />
                                    Connect New Channel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex flex-1">
                    {/* Sidebar */}
                    <div className="w-64 border-r border-gray-200 p-4">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="font-medium">Connected Channels</h2>
                        </div>

                        <div className="space-y-1">
                            <a href="#" className="flex items-center rounded-md bg-blue-50 px-3 py-2 text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                All Channels
                            </a>

                            {channels.length > 0 ? (
                                channels.map((channel) => (
                                    <div
                                        key={channel.id}
                                        className={`flex relative items-center justify-between rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 ${
                                            selectedChannel === channel.id ? 'bg-gray-50' : ''
                                        }`}
                                    >
                                        <div className="flex flex-grow cursor-pointer items-center" onClick={() => handleChannelClick(channel.id)}>
                                            {getPlatformIcon(channel.platform)}
                                            <div className="ml-2">
                                                <div className="font-medium">{channel.name}</div>
                                                <div className="text-xs text-gray-500">@{channel.username}</div>
                                            </div>
                                        </div>

                                        {selectedChannel === channel.id && (
                                            <button
                                                onClick={() => handleDisconnect(channel.id)}
                                                disabled={disconnecting}
                                                className={`ml-2 absolute top-12 left-12 rounded-md px-3 py-1 text-sm transition-colors ${
                                                    disconnecting
                                                        ? 'cursor-not-allowed text-gray-400'
                                                        : 'text-red-600 hover:bg-red-50 hover:text-red-800'
                                                }`}
                                            >
                                                {disconnecting ? (
                                                    <span className="flex items-center">
                                                        <svg
                                                            className="mr-2 -ml-1 h-4 w-4 animate-spin text-gray-600"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <circle
                                                                className="opacity-25"
                                                                cx="12"
                                                                cy="12"
                                                                r="10"
                                                                stroke="currentColor"
                                                                strokeWidth="4"
                                                            ></circle>
                                                            <path
                                                                className="opacity-75"
                                                                fill="currentColor"
                                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                            ></path>
                                                        </svg>
                                                        Disconnecting...
                                                    </span>
                                                ) : (
                                                    'Disconnect'
                                                )}
                                            </button>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="p-3 text-sm text-gray-500">No channels connected yet</div>
                            )}
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 p-6">
                        {channels.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16">
                                <div className="mb-4 rounded-full bg-blue-50 p-6">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-12 w-12 text-blue-600"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <h2 className="mb-2 text-lg font-medium">No channels connected</h2>
                                <p className="mb-6 text-gray-500">Connect your first channel to get started</p>
                                <button onClick={openModal} className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-white">
                                    <PlusIcon className="mr-1 h-4 w-4" />
                                    Connect a Channel
                                </button>
                            </div>
                        ) : (
                            <PostPage />
                        )}
                    </div>
                </div>
            </div>

            {/* Connect Channel Modal */}
            <ConnectChannelModal isOpen={isModalOpen} onClose={closeModal} />
        </NavBar>
    );
}

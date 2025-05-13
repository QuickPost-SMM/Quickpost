import NavBar from '@/layouts/NavBar';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/react';
import { CheckCircle, Facebook, Instagram, LinkIcon, RefreshCw, Twitter, XCircle, Youtube } from 'lucide-react';

interface SocialAccount {
    id: number;
    platform: string;
    username: string;
    connected: boolean;
    lastSync: string | null;
    error: string | null;
}

interface SocialAccountsProps {
    accounts: SocialAccount[];
}

export default function SocialAccounts() {
    const accounts = [
        {
            id: 1,
            platform: 'Twitter',
            username: 'john_doe',
            connected: true,
            lastSync: '2025-05-01T14:30:00Z',
            error: null,
        },
        {
            id: 2,
            platform: 'Facebook',
            username: 'john.doe.fb',
            connected: false,
            lastSync: null,
            error: null,
        },
        {
            id: 3,
            platform: 'Instagram',
            username: 'john_insta',
            connected: true,
            lastSync: '2025-04-30T10:00:00Z',
            error: 'Failed to fetch latest posts.',
        },
        {
            id: 4,
            platform: 'YouTube',
            username: 'john-doe',
            connected: true,
            lastSync: '2025-05-01T09:15:00Z',
            error: null,
        },
    ];

    const handleConnect = (platform: string) => {
        // In a real app, you would redirect to OAuth flow
        alert(`Connecting to ${platform}...`);
    };

    const handleDisconnect = (accountId: number) => {
        if (confirm('Are you sure you want to disconnect this account?')) {
            Inertia.delete(`/social-accounts/${accountId}`);
        }
    };

    const handleRefresh = (accountId: number) => {
        Inertia.post(`/social-accounts/${accountId}/refresh`);
    };

    const renderPlatformIcon = (platform: string, size = 5) => {
        switch (platform.toLowerCase()) {
            case 'twitter':
                return <Twitter className={`h-${size} w-${size} text-blue-400`} />;
            case 'facebook':
                return <Facebook className={`h-${size} w-${size} text-blue-600`} />;
            case 'instagram':
                return <Instagram className={`h-${size} w-${size} text-pink-500`} />;
            case 'YouTube':
                return <Youtube className={`h-${size} w-${size} text-blue-700`} />;
            default:
                return null;
        }
    };

    const formatLastSync = (dateString: string | null) => {
        if (!dateString) return 'Never';

        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <NavBar title="Social Accounts">
            <Head title="Social Accounts" />

            <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-900">Connected Accounts</h2>
                <p className="mt-1 text-sm text-gray-500">Connect your social media accounts to post and schedule content.</p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {accounts.map((account) => (
                    <div key={account.id} className="overflow-hidden rounded-lg bg-white shadow">
                        <div className="p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">{renderPlatformIcon(account.platform)}</div>
                                <div className="ml-4 flex-1">
                                    <h3 className="text-lg font-medium text-gray-900">{account.platform}</h3>
                                    {account.connected ? (
                                        <div className="flex items-center text-sm text-green-600">
                                            <CheckCircle className="mr-1 h-4 w-4" />
                                            Connected as @{account.username}
                                        </div>
                                    ) : (
                                        <div className="flex items-center text-sm text-gray-500">
                                            <XCircle className="mr-1 h-4 w-4" />
                                            Not connected
                                        </div>
                                    )}
                                </div>
                            </div>

                            {account.error && <div className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{account.error}</div>}

                            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                                <div>Last synced: {formatLastSync(account.lastSync)}</div>
                                <div className="flex space-x-2">
                                    {account.connected ? (
                                        <>
                                            <button
                                                onClick={() => handleRefresh(account.id)}
                                                className="flex items-center text-blue-600 hover:text-blue-500"
                                            >
                                                <RefreshCw className="mr-1 h-4 w-4" />
                                                Refresh
                                            </button>
                                            <button
                                                onClick={() => handleDisconnect(account.id)}
                                                className="flex items-center text-red-600 hover:text-red-500"
                                            >
                                                <XCircle className="mr-1 h-4 w-4" />
                                                Disconnect
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => handleConnect(account.platform)}
                                            className="flex items-center text-blue-600 hover:text-blue-500"
                                        >
                                            <LinkIcon className="mr-1 h-4 w-4" />
                                            Connect
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </NavBar>
    );
}

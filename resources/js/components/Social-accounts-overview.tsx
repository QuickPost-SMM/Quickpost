import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';
import { Facebook, Instagram, Link as LinkIcon, Twitter, Youtube } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SocialAccount {
    id: string;
    platform: string;
    username: string;
    name: string;
    email?: string;
    avatar?: string;
    connected_at: string;
}

export default function SocialAccountsOverview() {

    const [accounts, setAccounts] = useState<SocialAccount[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchConnectedAccounts = async () => {
            try {
                const response = await axios.get('/social/accounts'); // Adjust endpoint as needed
                console.log(response.data);
                
                setAccounts(response.data.channels || []);
            } catch (err) {
                setError(err.response?.data?.message || err.message || 'Failed to fetch connected accounts');
            } finally {
                setLoading(false);  
            }
        };

        fetchConnectedAccounts();
    }, []);

    const getPlatformIcon = (platform: string) => {
        switch (platform.toLowerCase()) {
            case 'facebook':
                return <Facebook className="h-5 w-5 text-blue-600" />;
            case 'instagram':
                return <Instagram className="h-5 w-5 text-pink-600" />;
            case 'twitter':
            case 'x':
                return <Twitter className="h-5 w-5 text-blue-400" />;
            case 'youtube':
                return <Youtube className="h-5 w-5 text-red-600" />;
            case 'linkedin':
                return <LinkIcon className="h-5 w-5 text-blue-700" />;
            default:
                return <div className="h-5 w-5 rounded-full bg-gray-300" />;
        }
    };

    if (loading) {
        return (
            <Card className="border-0 bg-white">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-black">Connected Accounts</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="h-5 w-5 animate-pulse rounded-full bg-gray-200" />
                                    <div>
                                        <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                                        <div className="mt-1 h-3 w-16 animate-pulse rounded bg-gray-200" />
                                    </div>
                                </div>
                                <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200" />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="border-0 bg-white">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-black">Connected Accounts</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-red-500">{error}</p>
                </CardContent>
            </Card>
        );
    }

    if (accounts.length === 0) {
        return (
            <Card className="border-0 bg-white">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-black">Connected Accounts</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-gray-500">No accounts connected yet</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border-0 bg-white">
            <CardHeader className="pb-2">
                <CardTitle className="text-l font-medium text-black">Connected Accounts</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {accounts.map((account) => (
                        <div key={account.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                {account.avatar ? (
                                    <img src={account.avatar} alt={`${account.name} avatar`} className="h-5 w-5 rounded-full" />
                                ) : (
                                    getPlatformIcon(account.platform)
                                )}
                                <div>
                                    <p className="text-sm font-medium">{account.name || account.username}</p>
                                    <p className="text-xs text-gray-500">Connected to {account.platform}</p>
                                </div>
                            </div>
                            <Badge variant="outline" className="border-green-200 bg-green-50 text-xs text-green-600">
                                Connected
                            </Badge>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

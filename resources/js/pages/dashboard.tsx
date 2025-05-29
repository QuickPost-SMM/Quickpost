// import Appearance from './settings/appearance';

// export default function Dashboard() {
//     return (
//         <>
//             <div
//                 onClick={() => {
//                     window.location.href = '/api/oauth/youtube/redirect';
//                 }}
//             >
//                   Connect YouTube
//             </div>
//             <div>
//                 <Appearance />
//             </div>
//         </>
//     );
// }

import AnalyticsOverview from '@/components/Analytics-overview';
import AnalyticsCard from '@/components/AnalyticsCard';
import PlatformDistribution from '@/components/PlatformDistribution';
import QuickPost from '@/components/QuickPost';
import RecentPostsList from '@/components/RecentPostList';
import SocialAccountsOverview from '@/components/Social-accounts-overview';
import NavBar from '@/layouts/NavBar';
import { Head, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface DashboardProps {
    analytics: {
        totalPosts: number;
        scheduledPosts: number;
        totalEngagement: number;
        growthRate: number;
    };
    recentPosts: Array<{
        id: number;
        content: string;
        platform: string;
        status: string;
        scheduledAt: string;
        engagement: number;
    }>;
    platformData: Array<{
        name: string;
        value: number;
    }>;
}

interface SocialAccount {
    id: string;
    platform: string;
    username: string;
    name: string;
    email?: string;
    avatar?: string;
    connected_at: string;
}

export default function Dashboard() {
    const [accounts, setAccounts] = useState<SocialAccount[]>([]);
    const [content , setContent] = useState(0);
    const [posts , setPosts] = useState(0);
    useEffect(() => {
        const fetchConnectedAccounts = async () => {
            try {
                const response = await axios.get('/social/accounts'); // Adjust endpoint as needed
                const resContent =  await axios.get('/contents');
                const resPosts = await axios.get('/posts/data');
                
                console.log(resPosts.data);
                console.log(response.data);
                console.log(resContent.data.length);
                
                setContent(resContent.data.length);
                setAccounts(response.data.channels || []);
                setPosts(resPosts.data.length);
            } catch (err) {
               console.log(err.response?.data?.message || err.message || 'Failed to fetch connected accounts');
            } finally {
            }
        };

        fetchConnectedAccounts();
    }, []);
    const platformData = [
        {
            name: 'YouTube',
            value: 680,
        },
        {
            name: 'Facebook',
            value: 300,
        },
        {
            name: 'Instagram',
            value: 200,
        },
        {
            name: 'TikTok',
            value: 150,
        },
    ];

    const { flash } = usePage().props as { flash: { error?: string; success?: string } };

    useEffect(() => {
        if (flash.error) {
            console.error('OAuth Error:', flash.error);
        }

        if (flash.success) {
            console.log('OAuth Success:', flash.success);
        }
    }, [flash]);

    return (
        <NavBar title={'Dashboard'}>
        
            <Head title="Dashboard" />
            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <AnalyticsCard title="Total Posts using QuickPost" value={posts} icon="FileText" trend={5} />
                <AnalyticsCard title="Total Contents" value={content} icon="Calendar" trend={2} />
                <AnalyticsCard title="Total Engagement" value={22} icon="Heart" trend={8} />
                <AnalyticsCard title="Connected Channels" value={accounts.length} icon="TrendingUp" trend={3} />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <div className="mb-6 rounded-lg bg-white p-6 shadow">
                        <h2 className="mb-4 text-lg font-medium text-gray-900">Recent Posts</h2>
                        <RecentPostsList />
                    </div>

                    <div className="rounded-lg bg-white p-6 shadow">
                        <h2 className="mb-4 text-lg font-medium text-gray-900">Platform Distribution</h2>
                        <PlatformDistribution data={platformData} />
                    </div>
                </div>

                <div>
                    <SocialAccountsOverview />
                    <div className="mb-3 rounded-lg bg-white p-6 shadow mt-2.5">
                        <h2 className="mb-4 text-lg font-medium text-gray-900">Quick Post</h2>
                        <QuickPost />
                    </div>
                    <AnalyticsOverview />
                </div>
            </div>
        </NavBar>
    );
}

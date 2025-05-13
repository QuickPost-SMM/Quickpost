import { useEffect, useState } from 'react';

import AnalyticsChart from '@/components/Analytics-chart';
import PerformanceTable from '@/components/performance-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NavBar from '@/layouts/NavBar';
import axios from 'axios';
import { ArrowDownRight, ArrowUpRight, PlusIcon } from 'lucide-react';

export default function Analytics() {
    const [posts, setPosts] = useState(0);
    const [views, setViews] = useState(0);
    const [followers, setFollowers] = useState(0);
    const [accounts, setAccounts] = useState(0);

    const [platform, setPlatform] = useState('youtube');

    useEffect(() => {
        const fetchAnalyticsData = async () => {
            const response = await axios.get('/api/youtube/channel');
            const responseAccounts = await axios.get('/social/accounts');
            console.log(response.data);
            setPosts(response.data.items[0].statistics.videoCount);
            setViews(response.data.items[0].statistics.viewCount);
            setFollowers(response.data.items[0].statistics.subscriberCount);
            setAccounts(responseAccounts.data.channels.length);
        };
        fetchAnalyticsData();
    });

    return (
        <NavBar title="Analytics">
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{posts}</div>
                        <div className="mt-1 flex items-center">
                            <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                            <span className="text-xs font-medium text-green-500">12.5%</span>
                            <span className="ml-1 text-xs text-gray-500">vs previous period</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{views}</div>
                        <div className="mt-1 flex items-center">
                            <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                            <span className="text-xs font-medium text-green-500">8.3%</span>
                            <span className="ml-1 text-xs text-gray-500">vs previous period</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Followers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{followers}</div>
                        <div className="mt-1 flex items-center">
                            <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                            <span className="text-xs font-medium text-green-500">5.7%</span>
                            <span className="ml-1 text-xs text-gray-500">vs previous period</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Connected Accounts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{accounts}</div>
                        <div className="mt-1 flex items-center">
                            <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                            <span className="text-xs font-medium text-red-500">0.8%</span>
                            <span className="ml-1 text-xs text-gray-500">vs previous period</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="mb-8">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Performance Overview</CardTitle>
                                <CardDescription>Track your social media performance across platforms</CardDescription>
                            </div>

                            <Select value={platform} onValueChange={setPlatform}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select platform" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Platforms</SelectItem>
                                    <SelectItem value="youtube">YouTube</SelectItem>
                                    <SelectItem value="instagram">Instagram</SelectItem>
                                    <SelectItem value="facebook">Facebook</SelectItem>
                                    <SelectItem value="tiktok">Tiktok</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <AnalyticsChart />
                    </CardContent>
                </Card>
            </div>

            <div>
                <Tabs defaultValue="posts">
                    <TabsList className="mb-4">
                        <TabsTrigger value="posts">Top Posts</TabsTrigger>
                    </TabsList>

                    <TabsContent value="posts" className="m-0">
                        <Card>
                            <CardHeader>
                                <CardTitle>Best Performing Posts</CardTitle>
                                <CardDescription>Your top posts based on engagement rate</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <PerformanceTable />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </NavBar>
    );
}

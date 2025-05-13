import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AnalyticsOverview() {
    const [metrics, setMetrics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchYouTubeAnalytics = async () => {
            try {
                const response = await axios.get('/api/youtube/analytics/list');
                setMetrics(response.data.metrics);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load YouTube analytics');
                console.error('Error fetching YouTube analytics:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchYouTubeAnalytics();
    }, []);

    if (loading) {
        return (
            <Card className="mt-2.5 border-0 bg-white text-black">
                <CardHeader className="pb-2">
                    <CardTitle className="text-l font-medium">Analytics Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="h-4 w-24 animate-pulse rounded bg-gray-200"></div>
                                <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="mt-2.5 border-0 bg-white text-black">
                <CardHeader className="pb-2">
                    <CardTitle className="text-l font-medium">Analytics Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-sm text-gray-500">Failed to load</div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="mt-2.5 border-0 bg-white text-black">
            <CardHeader className="pb-2">
                <CardTitle className="text-l font-medium">YouTube Analytics</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {metrics.map((metric, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <p className="text-sm">{metric.name}</p>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">{metric.value}</span>
                                <div className={`flex items-center text-xs ${metric.increasing ? 'text-green-500' : 'text-red-500'}`}>
                                    {metric.increasing ? <ArrowUpRight className="mr-0.5 h-3 w-3" /> : <ArrowDownRight className="mr-0.5 h-3 w-3" />}
                                    {metric.change}%
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

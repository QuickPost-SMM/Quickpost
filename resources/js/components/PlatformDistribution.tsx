interface Post {
    id: number;
    user_id: number;
    post_id: string;
    platform: string;
    // ... other fields
}

interface PlatformDistributionProps {
    posts: Post[]; // Changed from data to posts to match your actual data structure
}

export default function PlatformDistribution({ posts }: PlatformDistributionProps) {
    // Count posts by platform
    const platformCounts = posts.reduce((acc, post) => {
        const platform = post.platform.toLowerCase();
        acc[platform] = (acc[platform] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    // Convert to PlatformData format
    const data = Object.entries(platformCounts).map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1), // Capitalize first letter
        value
    }));

    const total = data.reduce((sum, item) => sum + item.value, 0);

    const getPlatformColor = (platform: string) => {
        switch (platform.toLowerCase()) {
            case 'twitter':
                return 'bg-blue-400';
            case 'facebook':
                return 'bg-blue-600';
            case 'instagram':
                return 'bg-pink-500';
            case 'youtube':
                return 'bg-red-600'; // Changed from blue-700 to red-600 for YouTube
            case 'linkedin':
                return 'bg-blue-700';
            case 'tiktok':
                return 'bg-black';
            default:
                return 'bg-gray-400';
        }
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Platform Distribution</h3>
            <div className="space-y-4">
                {data.map((item) => {
                    const percentage = Math.round((item.value / total) * 100);

                    return (
                        <div key={item.name} className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center">
                                    <div className={`w-3 h-3 rounded-full mr-2 ${getPlatformColor(item.name)}`}></div>
                                    <span className="font-medium text-gray-700">{item.name}</span>
                                </div>
                                <div className="text-gray-500">
                                    {item.value} {item.value === 1 ? 'post' : 'posts'} ({percentage}%)
                                </div>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                                <div 
                                    className={`h-full ${getPlatformColor(item.name)}`} 
                                    style={{ width: `${percentage}%` }}
                                ></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
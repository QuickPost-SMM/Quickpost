interface PlatformData {
    name: string;
    value: number;
}

interface PlatformDistributionProps {
    data: PlatformData[];
}

export default function PlatformDistribution({ data }: PlatformDistributionProps) {
    const total = data.reduce((sum, item) => sum + item.value, 0);

    const getPlatformColor = (platform: string) => {
        switch (platform.toLowerCase()) {
            case 'twitter':
                return 'bg-blue-400';
            case 'facebook':
                return 'bg-blue-600';
            case 'instagram':
                return 'bg-pink-500';
            case 'YouTube':
                return 'bg-blue-700';
            default:
                return 'bg-gray-400';
        }
    };

    return (
        <div>
            <div className="space-y-4">
                {data.map((item) => {
                    const percentage = Math.round((item.value / total) * 100);

                    return (
                        <div key={item.name} className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <div className="font-medium text-gray-700">{item.name}</div>
                                <div className="text-gray-500">{percentage}%</div>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                                <div className={`h-full ${getPlatformColor(item.name)}`} style={{ width: `${percentage}%` }}></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

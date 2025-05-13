import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function YouTubeAnalyticsChart() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setMounted(true);
    fetchYouTubeAnalytics();
  }, []);

  const fetchYouTubeAnalytics = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/youtube/analytics');
      
      // Transform YouTube API response to Recharts compatible format
      const transformedData = response.data.rows.map(row => ({
        date: row[0], // day
        views: row[1], // views
        likes: row[2], // likes
        minutesWatched: row[3] // estimatedMinutesWatched
      }));
      
      setChartData(transformedData);
      console.log(transformedData);
      
    } catch (err) {
      setError(err.message || "Failed to fetch YouTube analytics");
      console.error("Error fetching YouTube analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <p className="text-gray-500">Initializing chart...</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <p className="text-gray-500">Loading YouTube analytics data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <p className="text-gray-500">Failed to load data</p>
      </div>
    );
  }

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }} 
            tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip 
            formatter={(value, name) => {
              if (name === 'minutesWatched') {
                return [`${Math.floor(value / 60)}h ${value % 60}m`, 'Watch Time'];
              }
              return [value, name === 'views' ? 'Views' : 'Likes'];
            }}
            labelFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="views"
            name="Views"
            stroke="#8884d8"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="likes"
            name="Likes"
            stroke="#82ca9d"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="minutesWatched"
            name="Watch Time (minutes)"
            stroke="#ffc658"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
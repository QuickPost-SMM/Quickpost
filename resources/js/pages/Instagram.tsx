import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Instagram() {
    const [pages, setPages] = useState([]);
    const [selectedPage, setSelectedPage] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');

    useEffect(() => {
        axios
            .get('/api/facebook/pages')
            .then((res) => {
                setPages(res.data);
                console.log(pages);
            })
            .catch(() => setStatus('Failed to load pages'));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedPage || !message) return;

        setLoading(true);
        setStatus('');

        try {
            const response = await axios.post('/api/facebook/post', {
                page_id: selectedPage,
                message,
            });
            console.log(response.data);
            
            setStatus('✅ Post published successfully!');
            setMessage('');
        } catch (err: any) {
            setStatus('❌ Failed: ' + (err.response?.data?.error || 'Unknown error'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-md rounded bg-white p-4 shadow">
            <h2 className="mb-4 text-xl font-bold">Post to Facebook Page</h2>

            <form onSubmit={handleSubmit}>
                <select value={selectedPage} onChange={(e) => setSelectedPage(e.target.value)} className="mb-3 w-full rounded border p-2">
                    <option value="">Select a page</option>
                    {pages.map((page: any) => (
                        <option key={page.id} value={page.id}>
                            {page.name}
                        </option>
                    ))}
                </select>

                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your post..."
                    className="mb-3 w-full rounded border p-2"
                    rows={4}
                />

                <button type="submit" disabled={loading} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50">
                    {loading ? 'Posting...' : 'Post'}
                </button>
            </form>

            {status && <p className="mt-3 text-sm">{status}</p>}
        </div>
    );
}

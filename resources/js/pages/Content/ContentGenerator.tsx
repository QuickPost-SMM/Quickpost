import axios from 'axios';
import { useState } from 'react';

export default function ContentGenerator() {
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('');

    const generateContent = () => {
        setLoading(true);
        axios
            .post(route('generate.content'), { prompt })
            .then((res) => {
                const text = res.data.content
                    .replace(/\*\*(.*?)\*\*/g, '') // remove bold
                    .replace(/\*/g, '') // remove bullets
                    .replace(/^[IVXLCDM]+\.\s*/gm, '') // remove roman numerals like I., II., etc.
                    .replace(/\n{2,}/g, '\n') // collapse extra newlines
                    .trim();
                setContent(text);
                console.log(res.data);
            })
            .catch(() => setContent('Something went wrong.'))
            .finally(() => setLoading(false));
    };

    return (
        <div className="mx-auto mt-10 max-w-2xl p-4">
            <h1 className="mb-4 text-2xl font-bold">AI Content Idea Generator</h1>
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="E.g., Generate Instagram post ideas for a fitness brand..."
                className="mb-4 w-full rounded border p-2"
                rows={5}
            />
            <button onClick={generateContent} disabled={loading} className="rounded bg-blue-600 px-4 py-2 text-white">
                {loading ? 'Generating...' : 'Generate Ideas'}
            </button>

            {content && <div className="mt-6 rounded border bg-gray-100 p-4 whitespace-pre-wrap">{content}</div>}
        </div>
    );
}

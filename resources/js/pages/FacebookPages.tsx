import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FacebookPosts from '@/components/FacebookPosts';

type Page = {
  id: string;
  name: string;
  access_token: string;
};

export default function FacebookPages() {
  const [pages, setPages] = useState<Page[]>([]);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('/api/facebook/pages')
      .then(res => {
        console.log(res.data);
        
        setPages(res.data || []);
      })
      .catch(err => {
        setError(err.response?.data?.error?.message || 'Failed to load pages');
      });
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Your Facebook Pages</h2>
      {error && <p className="text-red-500">{error}</p>}
      
      {pages.length > 0 && (
        <select
          className="p-2 border rounded"
          onChange={(e) => {
            const page = pages.find(p => p.id === e.target.value);
            setSelectedPage(page || null);
          }}
        >
          <option value="">Select a page</option>
          {pages.map((page) => (
            <option key={page.id} value={page.id}>
              {page.name}
            </option>
          ))}
        </select>
      )}

      {selectedPage && <FacebookPosts pageId={selectedPage.id} />}
    </div>
  );
}

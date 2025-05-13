import { useForm } from '@inertiajs/react';

export default function Index({ contents }) {
  const { data, setData, post, processing, reset } = useForm({
    title: '',
    description: '',
    media_url: '',
    status: 'unassigned',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('contents.store'), {
      onSuccess: () => reset(),
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create Content</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" value={data.title} onChange={e => setData('title', e.target.value)} placeholder="Title" required className="border p-2 w-full" />
        <textarea value={data.description} onChange={e => setData('description', e.target.value)} placeholder="Description" className="border p-2 w-full" />
        <input type="text" value={data.media_url} onChange={e => setData('media_url', e.target.value)} placeholder="Media URL" className="border p-2 w-full" />
        <select value={data.status} onChange={e => setData('status', e.target.value)} className="border p-2 w-full">
          <option value="unassigned">Unassigned</option>
          <option value="to-do">To-do</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
        <button type="submit" disabled={processing} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
      </form>

      <h2 className="text-xl font-semibold mt-8">Your Contents</h2>
      <ul className="mt-4 space-y-2">
        {contents.map(content => (
          <li key={content.id} className="border p-4 rounded">
            <strong>{content.title}</strong> — {content.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
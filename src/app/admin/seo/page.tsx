'use client';
import { useState, useEffect } from 'react';

export default function AdminSEOPage() {
  const [page, setPage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (page) {
      fetch(`/api/seo?page=${encodeURIComponent(page)}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.page) {
            setTitle(data.title || '');
            setDescription(data.description || '');
            setKeywords(data.keywords || '');
            setImage(data.image || '');
          } else {
            setTitle(''); setDescription(''); setKeywords(''); setImage('');
          }
        });
    }
  }, [page]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Saving...');
    const res = await fetch('/api/seo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page, title, description, keywords, image })
    });
    if (res.ok) setStatus('Saved!'); else setStatus('Error saving');
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">SEO Meta Tags</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Page Path (e.g. /about)</label>
          <input value={page} onChange={e => setPage(e.target.value)} className="input input-bordered w-full" required />
        </div>
        <div>
          <label className="block font-medium">Title</label>
          <input value={title} onChange={e => setTitle(e.target.value)} className="input input-bordered w-full" />
        </div>
        <div>
          <label className="block font-medium">Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} className="textarea textarea-bordered w-full" />
        </div>
        <div>
          <label className="block font-medium">Keywords (comma separated)</label>
          <input value={keywords} onChange={e => setKeywords(e.target.value)} className="input input-bordered w-full" />
        </div>
        <div>
          <label className="block font-medium">Open Graph Image URL</label>
          <input value={image} onChange={e => setImage(e.target.value)} className="input input-bordered w-full" />
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
        {status && <div className="text-sm mt-2">{status}</div>}
      </form>
    </div>
  );
}

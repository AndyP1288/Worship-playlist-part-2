import { useState } from 'react';
import { MAX_PDF_MB, SONG_BUCKET, supabase } from '../supabaseClient';

function SongForm({ userId, onSongAdded }) {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!pdfFile) {
      setStatus('Please select a PDF chord sheet.');
      return;
    }

    if (pdfFile.type !== 'application/pdf') {
      setStatus('Only PDF files are allowed.');
      return;
    }

    if (pdfFile.size > MAX_PDF_MB * 1024 * 1024) {
      setStatus(`File is too large. Maximum size is ${MAX_PDF_MB}MB.`);
      return;
    }

    try {
      setSubmitting(true);
      setStatus('Uploading PDF…');

      const safeName = pdfFile.name.replace(/[^a-zA-Z0-9._-]/g, '-').toLowerCase();
      const filePath = `${userId}/${Date.now()}-${safeName}`;

      const { error: uploadError } = await supabase.storage.from(SONG_BUCKET).upload(filePath, pdfFile, {
        contentType: 'application/pdf',
        upsert: false,
        cacheControl: '3600'
      });
      if (uploadError) throw uploadError;

      const {
        data: { publicUrl }
      } = supabase.storage.from(SONG_BUCKET).getPublicUrl(filePath);

      const { error: insertError } = await supabase.from('songs').insert({
        title: title.trim(),
        artist: artist.trim(),
        pdf_url: publicUrl,
        created_by: userId
      });
      if (insertError) throw insertError;

      setTitle('');
      setArtist('');
      setPdfFile(null);
      setStatus('Song saved successfully.');
      onSongAdded();
    } catch (error) {
      setStatus(error.message || 'Failed to add song.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Add Song</h2>
      <p className="muted">Upload chord sheet PDFs to Supabase Storage.</p>

      <label htmlFor="title">Title</label>
      <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

      <label htmlFor="artist">Artist</label>
      <input id="artist" type="text" value={artist} onChange={(e) => setArtist(e.target.value)} required />

      <label htmlFor="pdf">PDF Chord Sheet</label>
      <input
        id="pdf"
        type="file"
        accept="application/pdf"
        onChange={(event) => setPdfFile(event.target.files?.[0] ?? null)}
        required
      />

      <button type="submit" disabled={submitting}>{submitting ? 'Saving…' : 'Add Song'}</button>

      {status ? <p className="message">{status}</p> : null}
    </form>
  );
}

export default SongForm;

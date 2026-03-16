import { useCallback, useEffect, useState } from 'react';
import SongForm from '../components/SongForm';
import SongList from '../components/SongList';
import { supabase } from '../supabaseClient';

function DashboardPage({ session }) {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchSongs = useCallback(async () => {
    setLoading(true);
    setError('');

    const { data, error: queryError } = await supabase
      .from('songs')
      .select('id, title, artist, pdf_url, created_by, created_at')
      .order('created_at', { ascending: false });

    if (queryError) {
      setError(queryError.message);
      setSongs([]);
    } else {
      setSongs(data || []);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <main className="container">
      <section className="card">
        <h2>Logged in user</h2>
        <p>{session.user.email}</p>
        <div className="actions">
          <button onClick={fetchSongs}>Refresh Songs</button>
          <button className="secondary" onClick={handleLogout}>Logout</button>
        </div>
      </section>

      <SongForm userId={session.user.id} onSongAdded={fetchSongs} />
      <SongList songs={songs} loading={loading} error={error} />
    </main>
  );
}

export default DashboardPage;

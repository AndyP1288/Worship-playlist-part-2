function SongList({ songs, loading, error }) {
  return (
    <section className="card">
      <h2>Song Library</h2>

      {loading ? <p>Loading songs…</p> : null}
      {error ? <p className="error">{error}</p> : null}

      {!loading && !error && songs.length === 0 ? <p>No songs yet. Add your first song above.</p> : null}

      {!loading && !error && songs.length > 0 ? (
        <ul className="song-list">
          {songs.map((song) => (
            <li key={song.id}>
              <div>
                <strong>{song.title}</strong>
                <p>{song.artist}</p>
                <small>{new Date(song.created_at).toLocaleString()}</small>
              </div>
              <a href={song.pdf_url} target="_blank" rel="noreferrer noopener">
                Download PDF
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

export default SongList;

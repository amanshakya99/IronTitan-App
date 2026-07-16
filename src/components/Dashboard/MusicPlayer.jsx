import '../../styles/dashboard/MusicPlayer.css'

export default function MusicPlayer({
  isOpen, onClose, tracks, currentIndex,
  isPlaying, progress, onTogglePlay, onNext, onPrev, onSelectTrack
}) {
  if (!tracks.length) return null
  const track = tracks[currentIndex]

  return (
    <div className={`music-player ${isOpen ? 'music-player--open' : ''}`}>
      <div className="music-player__handle" onClick={onClose} />

      <div className="music-player__top">
        <button className="music-player__close" onClick={onClose}>↓</button>
        <span className="music-player__heading">Now Playing</span>
        <div style={{ width: 32 }} />
      </div>

      <img
        className="music-player__art"
        src={track.artworkUrl100.replace('100x100', '400x400')}
        alt={track.trackName}
      />

      <div className="music-player__info">
        <div className="music-player__track-name">{track.trackName}</div>
        <div className="music-player__artist">{track.artistName}</div>
      </div>

      <div className="music-player__progress-track">
        <div
          className="music-player__progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="music-player__controls">
        <button className="music-player__btn" onClick={onPrev}>⏮</button>
        <button
          className="music-player__btn music-player__btn--play"
          onClick={onTogglePlay}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button className="music-player__btn" onClick={onNext}>⏭</button>
      </div>

      <div className="music-player__tracklist">
        <div className="music-player__tracklist-label">Up Next</div>
        {tracks.map((t, i) => (
          <div
            key={i}
            className={`music-player__track-row ${i === currentIndex ? 'music-player__track-row--active' : ''}`}
            onClick={() => onSelectTrack(i)}
          >
            <img
              className="music-player__track-thumb"
              src={t.artworkUrl100}
              alt={t.trackName}
            />
            <div className="music-player__track-meta">
              <span className="music-player__track-row-name">{t.trackName}</span>
              <span className="music-player__track-row-artist">{t.artistName}</span>
            </div>
            {i === currentIndex && isPlaying && (
              <span className="music-player__playing-dot">▶</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
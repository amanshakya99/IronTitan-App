import { useEffect, useState, useRef } from 'react'
import { searchWorkoutTracks } from '../../api/musicApi'
import MusicPlayer from './MusicPlayer'
import '../../styles/dashboard/MusicCard.css'

export default function MusicCard() {
  const [tracks, setTracks] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [loading, setLoading] = useState(true)
  const [playerOpen, setPlayerOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef(null)

  useEffect(() => {
    async function fetchTracks() {
      try {
        const results = await searchWorkoutTracks()
        setTracks(results)
      } catch (err) {
        console.error('Failed to fetch tracks:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchTracks()
  }, [])

  useEffect(() => {
    if (!audioRef.current || !tracks.length) return
    audioRef.current.src = tracks[currentIndex].previewUrl
    if (isPlaying) audioRef.current.play()
  }, [currentIndex, tracks])

  function togglePlay(e) {
    e.stopPropagation()
    if (!audioRef.current) return
    if (isPlaying) audioRef.current.pause()
    else audioRef.current.play()
    setIsPlaying(!isPlaying)
  }

  function nextTrack(e) {
    e?.stopPropagation()
    setCurrentIndex(i => (i + 1) % tracks.length)
    setIsPlaying(true)
  }

  function prevTrack(e) {
    e?.stopPropagation()
    setCurrentIndex(i => (i - 1 + tracks.length) % tracks.length)
    setIsPlaying(true)
  }

  function handleTimeUpdate() {
    if (!audioRef.current) return
    const { currentTime, duration } = audioRef.current
    setProgress(duration ? (currentTime / duration) * 100 : 0)
  }

  if (loading) return (
    <div className="music-card">
      <div className="music-card__loading">Loading tracks...</div>
    </div>
  )

  if (!tracks.length) return null

  const track = tracks[currentIndex]

  return (
    <>
      <audio
        ref={audioRef}
        onEnded={nextTrack}
        onTimeUpdate={handleTimeUpdate}
      />

      <div className="music-card" onClick={() => setPlayerOpen(true)}>
        <div className="music-card__header">
          <div className="music-card__icon">🎵</div>
          <span className="music-card__title">Workout Music</span>
          <span className="music-card__expand">↑</span>
        </div>

        <div className="music-card__body">
          <img
            className="music-card__art"
            src={track.artworkUrl100}
            alt={track.trackName}
          />
          <div className="music-card__info">
            <div className="music-card__track-name">{track.trackName}</div>
            <div className="music-card__artist">{track.artistName}</div>
          </div>
        </div>

        <div className="music-card__progress-track">
          <div
            className="music-card__progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="music-card__controls">
          <button className="music-card__btn" onClick={prevTrack}>⏮</button>
          <button className="music-card__btn music-card__btn--play" onClick={togglePlay}>
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button className="music-card__btn" onClick={nextTrack}>⏭</button>
        </div>
      </div>

      <MusicPlayer
        isOpen={playerOpen}
        onClose={() => setPlayerOpen(false)}
        tracks={tracks}
        currentIndex={currentIndex}
        isPlaying={isPlaying}
        progress={progress}
        onTogglePlay={togglePlay}
        onNext={nextTrack}
        onPrev={prevTrack}
        onSelectTrack={(i) => { setCurrentIndex(i); setIsPlaying(true) }}
      />
    </>
  )
}
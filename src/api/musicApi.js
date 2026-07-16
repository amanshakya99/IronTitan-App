const TERMS = [
  'workout gym motivation',
  'hip hop workout',
  'running music',
  'gym beast mode',
  'electronic workout'
]

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

export async function searchWorkoutTracks() {
  const term = TERMS[Math.floor(Math.random() * TERMS.length)]
  const res = await fetch(
    `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=music&limit=20&entity=song`
  )
  const data = await res.json()
  return shuffle(data.results.filter(track => track.previewUrl))
}
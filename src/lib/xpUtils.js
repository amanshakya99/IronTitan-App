export const LEVELS = [
  { level: 1,  name: 'Rookie',        badge: '🥉', xpRequired: 0 },
  { level: 2,  name: 'Beginner',      badge: '🥉', xpRequired: 500 },
  { level: 3,  name: 'Apprentice',    badge: '🥈', xpRequired: 1200 },
  { level: 4,  name: 'Athlete',       badge: '🥈', xpRequired: 2200 },
  { level: 5,  name: 'Iron Athlete',  badge: '🏅', xpRequired: 3500 },
  { level: 6,  name: 'Bronze Warrior',badge: '🏅', xpRequired: 5200 },
  { level: 7,  name: 'Silver Fighter',badge: '🥇', xpRequired: 7200 },
  { level: 8,  name: 'Gold Fighter',  badge: '🥇', xpRequired: 9800 },
  { level: 9,  name: 'Elite',         badge: '🏆', xpRequired: 13000 },
  { level: 10, name: 'Legend',        badge: '🏆', xpRequired: 17000 },
]

export function getLevelData(totalXP) {
  let current = LEVELS[0]
  let next = LEVELS[1]

  for (let i = 0; i < LEVELS.length; i++) {
    if (totalXP >= LEVELS[i].xpRequired) {
      current = LEVELS[i]
      next = LEVELS[i + 1] || null
    }
  }

  const xpIntoLevel = totalXP - current.xpRequired
  const xpNeeded = next ? next.xpRequired - current.xpRequired : 1
  const progress = next ? Math.min((xpIntoLevel / xpNeeded) * 100, 100) : 100

  return { current, next, xpIntoLevel, xpNeeded, progress }
}
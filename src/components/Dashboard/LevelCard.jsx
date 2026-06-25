import { useEffect, useState, useRef } from 'react'
import { getCurrentUser, getUserStats } from '../../api' // Using your defined API imports
import { getLevelData } from '../../lib/xpUtils'
import '../../styles/dashboard/LevelCard.css'

export default function LevelCard() {
  const [xp, setXp] = useState(0)
  const [levelData, setLevelData] = useState(null)
  const [displayProgress, setDisplayProgress] = useState(0)
  const animRef = useRef(null)

  // Fetch XP using your API helpers
  useEffect(() => {
    async function fetchXP() {
      try {
        const user = await getCurrentUser()
        if (!user) return

        const stats = await getUserStats(user.id)
        const totalXP = stats?.total_xp ?? 0
        
        setXp(totalXP)
        setLevelData(getLevelData(totalXP))
      } catch (error) {
        console.error("Error fetching XP data:", error)
      }
    }
    fetchXP()
  }, [])

  // Animate XP bar
  useEffect(() => {
    if (!levelData) return
    
    const target = levelData.progress
    let start = null
    const duration = 1000

    function animate(ts) {
      if (!start) start = ts
      const elapsed = ts - start
      
      // Fixed: Proper linear interpolation calculation
      const prog = Math.min((elapsed / duration) * target, target)
      setDisplayProgress(prog)
      
      if (elapsed < duration) {
        animRef.current = requestAnimationFrame(animate)
      }
    }

    animRef.current = requestAnimationFrame(animate)
    
    // Cleanup on unmount or when levelData changes
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [levelData]) // Safely re-runs if levelData updates

  if (!levelData) return null

  const { current, next, xpIntoLevel, xpNeeded } = levelData

  return (
    <div className="level-card">
      <div className="level-card__top">
        <div className="level-card__info">
          <span className="level-card__label">Current Level</span>
          <span className="level-card__number">{current.level}</span>
          <span className="level-card__name">{current.name}</span>
        </div>
        <div className="level-card__badge">
          <span className="level-card__badge-icon">{current.badge}</span>
          <span className="level-card__badge-label">
            {current.name.split(' ')[0]}
          </span>
        </div>
      </div>

      <div className="level-card__xp-row">
        <div className="level-card__total-xp">Total XP: {xp.toLocaleString()}</div>
        <span className="level-card__xp-label">XP Progress</span>
        <span className="level-card__xp-val">
          {xpIntoLevel.toLocaleString()} / {xpNeeded.toLocaleString()}
        </span>
      </div>
      <div className="level-card__track">
        <div
          className="level-card__fill"
          style={{ width: `${displayProgress}%` }}
        />
      </div>
      <div className="level-card__hint">
        {next
          ? `${(xpNeeded - xpIntoLevel).toLocaleString()} XP to level ${next.level} · ${next.name}`
          : 'Max level reached 🏆'}
      </div>
    </div>
  )
}
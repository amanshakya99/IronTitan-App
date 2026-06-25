import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function TopBar() {
  const [username, setUsername] = useState('')
  const [initials, setInitials] = useState('U')

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const name = user.user_metadata?.full_name || user.email
        setUsername(name.split('@')[0])
        setInitials(name.charAt(0).toUpperCase())
      }
    }
    getUser()
  }, [])

  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="topbar-avatar">{initials}</div>
        <div className="topbar-info">
          <span className="topbar-greeting">Good morning,</span>
          <span className="topbar-username">{username} 👊</span>
        </div>
      </div>
      <div className="topbar-right">
        <button className="icon-btn" aria-label="Notifications">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <span className="notif-dot" />
        </button>
        <button className="icon-btn" aria-label="Profile">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
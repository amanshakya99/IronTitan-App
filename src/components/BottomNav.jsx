import "../styles/BottomNav.css";
import { useNavigate, useLocation } from 'react-router-dom';
import { House, Dumbbell, Flame, TrendingUp, User } from 'lucide-react';

const tabs = [
  { label: 'Home',     icon: House,      path: '/dashboard' },
  { label: 'Workout',  icon: Dumbbell,   path: '/workout' },
  { label: 'Exercise', icon: Flame,      path: '/exercise' },
  { label: 'Progress', icon: TrendingUp, path: '/progress' },
  { label: 'Profile',  icon: User,       path: '/profile' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="btm-container">
      {tabs.map(({ label, icon: Icon, path }) => (
        <button
          key={label}
          className={`nav-item ${location.pathname === path ? 'nav-item--active' : ''}`}
          onClick={() => navigate(path)}
        >
          <Icon className="nav-icon" />
          <span className="nav-label">{label}</span>
        </button>
      ))}
    </nav>
  );
}
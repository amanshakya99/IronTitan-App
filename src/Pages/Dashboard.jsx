import TopBar from '../components/dashboard/TopBar'
import '../styles/dashboard/TopBar.css'
import '../styles/Dashboard.css'
import BottomNav from '../components/BottomNav'
import LevelCard from '../components/Dashboard/LevelCard'
import StreakCard from '../components/Dashboard/StreakCard'
import WorkoutsCard from '../components/dashboard/WorkoutsCard'

export default function Dashboard() {
  return (
    <div className="dashboard">
      <TopBar />
      <main className="dashboard-main">
        {/* Cards will go here one by one */}
        <LevelCard />
        <div className="dashboard-row">
          <StreakCard />
          {/* <WorkoutsCard /> */}
          <WorkoutsCard />
        </div>

      </main>
      <BottomNav />
    </div>
  )
}
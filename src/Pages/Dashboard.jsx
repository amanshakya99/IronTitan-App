import TopBar from '../components/dashboard/TopBar'
import '../styles/dashboard/TopBar.css'
import '../styles/Dashboard.css'
import BottomNav from '../components/BottomNav'
import LevelCard from '../components/Dashboard/LevelCard'
import StreakCard from '../components/Dashboard/StreakCard'
import TotalWorkoutsCard from '../components/Dashboard/TotalWorkout'
import WorkoutsCard from '../components/dashboard/WorkoutsCard'
import TodaysWorkoutCard from '../components/Dashboard/TodaysWorkoutCard'
import WeeklyProgress from '../components/Dashboard/WeeklyProgress'

export default function Dashboard() {
  return (
    <div className="dashboard">
      <TopBar />
      <main className="dashboard-main">
        <LevelCard />

        <div className="dashboard-row">
          <StreakCard />
          <TotalWorkoutsCard />
        </div>
        <TodaysWorkoutCard />
        <WorkoutsCard />
        <WeeklyProgress />
      </main>
      <BottomNav />
    </div>
  )
}
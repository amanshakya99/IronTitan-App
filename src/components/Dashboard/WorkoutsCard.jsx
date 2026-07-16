import { useEffect, useState, useRef } from "react";
import { getCurrentUser, getMonthlyWorkoutCount } from "../../api";
import "../../styles/dashboard/WorkoutsCard.css";

export default function WorkoutsCard() {
  const [total, setTotal] = useState(0);
  const [displayNum, setDisplayNum] = useState(0);
  const [goal] = useState(20);
  const animRef = useRef(null);

 useEffect(() => {
  async function fetchWorkouts() {
    const user = await getCurrentUser()
    console.log("user:", user)

    if (!user) return

    const count = await getMonthlyWorkoutCount(user.id)
    console.log("monthly count:", count)

    setTotal(count || 0)
  }

  fetchWorkouts()
}, [])

useEffect(() => {
  console.log("total state:", total)
}, [total])

  const percentage = Math.min((total / goal) * 100, 100);
  const circumference = 2 * Math.PI * 16;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="workouts-card">
      <div className="workouts-card__label">Monthly</div>
      <div className="workouts-card__number">{displayNum}</div>
      <div className="workouts-card__sub">workouts this month</div>
      <div className="workouts-card__divider" />
      <div className="workouts-card__ring-row">
        <svg width="40" height="40" viewBox="0 0 40 40">
          <circle
            cx="20"
            cy="20"
            r="16"
            fill="none"
            stroke="var(--bg-raised)"
            strokeWidth="4"
          />
          <circle
            cx="20"
            cy="20"
            r="16"
            fill="none"
            stroke="var(--accent-blue)"
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 20 20)"
            style={{ transition: "stroke-dashoffset 1s ease" }}
          />
        </svg>
        <div className="workouts-card__ring-info">
          <span className="workouts-card__ring-status">
            {percentage >= 100 ? "Goal reached! 🎉" : "On track"}
          </span>
          <span className="workouts-card__ring-goal">Goal: {goal}/mo</span>
        </div>
      </div>
    </div>
  );
}

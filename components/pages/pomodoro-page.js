"use client"

import { useState,useEffect } from "react"
import '../../styles/pages/pomodoro-page.css';
export default function Pomodoro(){
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 mins
    const [isRunning, setIsRunning] = useState(false);
    const [isWorkSession, setIsWorkSession] = useState(true);

    useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
        timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0) {
        setIsWorkSession((prev) => !prev);
        setTimeLeft(isWorkSession ? 5 * 60 : 25 * 60); // Switch sessions
        alert(isWorkSession ? "Break Time!" : "Work Time!");
    }
    return () => clearInterval(timer);
    }, [isRunning, timeLeft, isWorkSession]);

    const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    return (
        <div className="pomodoro-section">
            <h3>An online Pomodoro Timer to boost your productivity</h3>

            <div className="pomodoro-timer">
                <div className="session-type">
                {isWorkSession ? "Work Session" : "Break Time"}
                </div>
                <div className="time-display">{formatTime(timeLeft)}</div>
                <div className="timer-controls">
                <button onClick={() => setIsRunning(true)}>Start</button>
                <button onClick={() => setIsRunning(false)}>Pause</button>
                <button
                    onClick={() => {
                    setIsRunning(false);
                    setTimeLeft(isWorkSession ? 25 * 60 : 5 * 60);
                    }}
                >
                    Reset
                </button>
                </div>
            </div>
        </div>
    )
}

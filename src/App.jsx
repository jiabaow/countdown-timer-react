import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [timer, setTimer] = useState(300);
  const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (isRunning) {
            const tick = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        return 0
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(tick);
        }
    }, [isRunning]);

    // decouple the state updates by handling them separately
    /*Decoupling State Updates:
        Single Responsibility: Each state updater (setTimer and setIsRunning) is responsible for a specific piece of state. setTimer only updates the timer, while setIsRunning handles the running state.
      How It Works:
        Timer Decrement: In your interval callback, setTimer solely decrements the timer.
        Monitoring Timer Changes: The separate useEffect watches for changes in the timer state.
        Condition Check: When timer reaches 0, it triggers setIsRunning(false), effectively stopping the countdown.
      Benefits:
        Clarity and Maintainability: By separating concerns, each piece of logic is clearer, making the code easier to understand and maintain.
        Predictable State Transitions: React can manage each state update more predictably without nested or intertwined updates.
        Ease of Testing: Isolated state updates are simpler to test individually.*/
    useEffect(() => {
        if (timer === 0) {
            setIsRunning(false);
        }
    }, [timer]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    const handleRestart = () => {
        setTimer(300);
        setIsRunning(false);
    }


  return (
    <>
      <div className="card">
        <h1>{formatTime(timer)}</h1>
        <button onClick={() => setIsRunning(true)} disabled={isRunning}>Start</button>
        <button onClick={() => setIsRunning(false)} disabled={!isRunning}>Stop</button>
        <button onClick={() => handleRestart()}>Reset</button>
      </div>
    </>
  )
}

export default App

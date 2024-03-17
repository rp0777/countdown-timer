import { useState } from "react";
import CounterDisplay from "../CounterDisplay/CounterDisplay";
import UserForm from "../UserForm/UserForm";
import styles from "./Home.module.css";

const Home = () => {
  const [inputDate, setInputDate] = useState("");
  const [countdownTimer, setCountdownTimer] = useState(false);

  return (
    <div className={styles.home}>
      <h1 className={styles.heading}>
        Countdown <span id={styles.subHeading}>Timer</span>
      </h1>

      {/* User Input Form */}
      <UserForm
        inputDate={inputDate}
        setInputDate={setInputDate}
        countdownTimer={countdownTimer}
        setCountdownTimer={setCountdownTimer}
      />

      {/* Counter Display */}
      {
        <CounterDisplay
          inputDate={inputDate}
          countdownTimer={countdownTimer}
          setCountdownTimer={setCountdownTimer}
        />
      }
    </div>
  );
};

export default Home;

// Validations for input
// 1.   The maximum days for the countdown timer should be 99 days.
// 2.   The maximum hours for the countdown timer should be 23 hours
// 3.   The maximum minutes for the countdown timer should be 59 minutes
// 4.   The maximum seconds for the countdown timer should be 59 seconds
// 5.   The cut-off date for the date picker should be 99 days from the current date

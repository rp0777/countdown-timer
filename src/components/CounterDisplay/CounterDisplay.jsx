import { useState, useEffect } from "react";
import styles from "./CounterDisplay.module.css";

const CounterDisplay = ({ inputDate, countdownTimer, setCountdownTimer }) => {
  const defaultCountdown = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  const [countdown, setCountdown] = useState(defaultCountdown);
  const [timerEnds, setTimerEnds] = useState(false);

  /**
   * Calculates the countdown based on the input date
   *
   * This function calculates the countdown based on the input date provided. It calculates the time difference between the current date and the input date, and then determines the days, hours, minutes, and seconds remaining until the input date is reached.
   * If the difference is less than or equal to 0, indicating that the input date has passed, it sets the timerEnds state to true and toggles the countdownTimer state to false.
   * @returns {Object} An object containing the days, hours, minutes, and seconds remaining until the input date.
   */

  const calculateCountdown = () => {
    const now = new Date().getTime();
    const inputDateObject = new Date(inputDate);
    const difference = inputDateObject.getTime() - now;

    if (difference <= 0) {
      setTimerEnds(true);
      setCountdownTimer(!countdownTimer);
      return defaultCountdown;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  useEffect(() => {
    if (inputDate && countdownTimer) {
      setTimerEnds(false);
      const timer = setInterval(() => {
        setCountdown(calculateCountdown());
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [inputDate, countdownTimer]);

  useEffect(() => {
    if (!countdownTimer) {
      setCountdown(defaultCountdown);
    }
  }, [countdownTimer]);

  return (
    <div className={styles.counterDisplay}>
      {timerEnds ? (
        <p className={styles.timerEnd}>
          🎉 The countdown is over! What's next on your adventure? 🎉
        </p>
      ) : (
        <>
          {countdown.days !== 0 && (
            <div className={styles.timeBlock}>
              <h1>{countdown.days}</h1>
              <p>Days</p>
            </div>
          )}
          {countdown.hours !== 0 && (
            <div className={styles.timeBlock}>
              <h1>{countdown.hours}</h1>
              <p>Hours</p>
            </div>
          )}
          {countdown.minutes !== 0 && (
            <div className={styles.timeBlock}>
              <h1>{countdown.minutes}</h1>
              <p>Minutes</p>
            </div>
          )}
          {countdown.seconds !== 0 && (
            <div className={styles.timeBlock}>
              <h1>{countdown.seconds}</h1>
              <p>Seconds</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CounterDisplay;

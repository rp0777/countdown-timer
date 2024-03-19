import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { inputDateState, countdownTimerState } from "../../store/atoms";
import styles from "./UserForm.module.css";

const UserForm = () => {
  const [inputDate, setInputDate] = useRecoilState(inputDateState);
  const [countdownTimer, setCountdownTimer] =
    useRecoilState(countdownTimerState);

  // Setting the present date to set min date as persent date
  let presentDate = new Date();
  presentDate = presentDate.toISOString().split("T")[0];

  // Setting Date limit max upto 100 days from the present date
  let maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 100);
  maxDate = maxDate.toISOString().split("T")[0];

  // if there exists inputDate or countdownTimer in localStorage
  // then setInputDate to stored inputDate and setCountdownTimer to stored countdownTimer
  useEffect(() => {
    const storedInputDate = localStorage.getItem("inputDate");
    if (storedInputDate) {
      setInputDate(storedInputDate);
    }

    const storedCountdownTimer = localStorage.getItem("countdownTimer");
    if (storedCountdownTimer) {
      setCountdownTimer(storedCountdownTimer === "true");
    }
  }, [setInputDate, setCountdownTimer]);

  // useEffect(() => {
  //   if (!countdownTimer) {
  //     // Reset input date when countdown timer is canceled
  //     setInputDate(""); // Reset input date to empty string
  //     localStorage.removeItem("inputDate"); // Remove input date from localStorage
  //   }
  // }, [countdownTimer, setInputDate]);

  /**
   * Validates the input date to ensure it's not more than 100 days from the current date
   *
   * @param {string} input - The input date string in the format YYYY-MM-DDTHH:mm (e.g., "2024-03-29T14:55")
   * @returns {boolean} - True if the input date is valid (not more than 100 days from today), false otherwise.
   */
  const validateInput = (input) => {
    const currentDate = new Date();
    const userInputDate = new Date(input);
    const difference = userInputDate.getTime() - currentDate.getTime();

    const millisecondsInADay = 1000 * 60 * 60 * 24;
    const daysDifference = difference / millisecondsInADay;

    if (daysDifference > 100) {
      alert(`The date should not be more than 100 days from today!`);
      return false;
    }

    return true;
  };

  /**
   * Handles the change event when the input date is modified
   *
   * This function is triggered when the value of the input date field changes. It validates the new input date using the validateInput function and updates the state with the new input date if it's valid.
   *
   * @param {Event} event - The event object representing the change event
   */
  const handleInputChange = (event) => {
    const input = event.target.value;
    const isValid = validateInput(input);

    if (isValid) {
      setInputDate(input);
      localStorage.setItem("inputDate", input);
    }
  };

  /**
   * Toggles the countdown timer state between active and inactive
   *
   * This function toggles the state of the countdown timer. If the countdown timer is currently active, it will be deactivated, and vice versa.
   * If the countdown timer is being deactivated, it also resets the input date to an empty string and removes both the countdownTimer and inputDate values from localStorage.
   * This function adds start and cancel timer feature to the application.
   */

  const toggleTimer = () => {
    if (!inputDate) {
      alert("Please select a date!");
    } else {
      if (countdownTimer) {
        setCountdownTimer(false);
        setInputDate(""); // Reset input date
        localStorage.removeItem("countdownTimer"); // Remove countdownTimer from localStorage
        localStorage.removeItem("inputDate"); // Remove inputDate from localStorage
      } else {
        setCountdownTimer(true);
        localStorage.setItem("countdownTimer", true); // Store countdownTimer in localStorage
      }
    }
  };

  return (
    <div className={styles.userForm}>
      {/* User input date */}
      <input
        className={styles.userFormItems}
        type="datetime-local"
        name="input date"
        min={`${presentDate} 00:00:00`}
        max={`${maxDate} 00:00:00`}
        value={inputDate}
        onChange={handleInputChange}
      />

      {/* Start / Cancel Timer button */}
      <button
        className={styles.userFormItems}
        id={styles.startButton}
        onClick={toggleTimer}
      >
        {countdownTimer ? "Cancel Timer" : "Start Timer"}
      </button>
    </div>
  );
};

export default UserForm;

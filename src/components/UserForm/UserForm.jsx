import React, { useState, useEffect } from "react";
import styles from "./UserForm.module.css";

const UserForm = ({
  inputDate,
  setInputDate,
  countdownTimer,
  setCountdownTimer,
}) => {
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30); // Set the maximum date (e.g., 30 days from today)

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
      setInputDate(event.target.value);
    }
  };

  /**
   * Toggles the countdown timer state between active and inactive
   *
   * This function toggles the state of the countdown timer. If the countdown timer is currently active, it will be deactivated, and vice versa. This is done to add start and cancel timer feature.
   */

  const toggleTimer = () => {
    if (!inputDate) {
      alert("Please select a date!");
    } else {
      setCountdownTimer(!countdownTimer);
    }
  };

  return (
    <div className={styles.userForm}>
      {/* User input date */}
      <input
        className={styles.userFormItems}
        type="datetime-local"
        name="input date"
        max={maxDate.toISOString().split("T")[0]} // Convert the date to ISO format and set it as the max attribute
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

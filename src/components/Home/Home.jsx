import { Suspense, lazy } from "react";
import CounterDisplay from "../CounterDisplay/CounterDisplay";
import UserForm from "../UserForm/UserForm";
import styles from "./Home.module.css";

// Lazy load the Spline component
const LazySpline = lazy(() => import("@splinetool/react-spline"));

const Home = () => {
  return (
    <div className={styles.home}>
      {/* Suspense component to handle the loading state */}
      <Suspense
        fallback={<div className={styles.timerLogo}>Loading Spline...</div>}
      >
        {/* Lazy loaded Spline component */}
        <LazySpline
          className={styles.timerLogo}
          scene="https://prod.spline.design/zVXmPJIVb9b5RCTH/scene.splinecode"
        />
      </Suspense>

      <h1 className={styles.heading}>
        Countdown <span id={styles.subHeading}>Timer</span>
      </h1>

      {/* User Input Form */}
      <UserForm />

      {/* Counter Display */}
      <CounterDisplay />
    </div>
  );
};

export default Home;

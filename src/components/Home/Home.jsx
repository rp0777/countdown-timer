import CounterDisplay from "../CounterDisplay/CounterDisplay";
import UserForm from "../UserForm/UserForm";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.home}>
      <h1>Heading</h1>

      {/* User Input Form */}
      <UserForm />

      {/* Counter Display */}
      <CounterDisplay />
    </div>
  );
};

export default Home;

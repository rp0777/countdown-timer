import { RecoilRoot } from "recoil";
import "./App.css";
import Home from "./components/Home/Home";

function App() {
  return (
    <RecoilRoot>
      <div className="app">
        <Home />
      </div>
    </RecoilRoot>
  );
}

export default App;

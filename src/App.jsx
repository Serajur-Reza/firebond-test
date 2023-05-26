import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { ArgsContext } from "./context/argsContext";
import Args from "./components/args/index";
import Logic from "./components/logic";

function App() {
  const [count, setCount] = useState(0);
  const [args, setArgs] = useState([{ title: "My args", status: true }]);

  return (
    <ArgsContext.Provider value={{ args, setArgs }}>
      <Args />
      <Logic />
    </ArgsContext.Provider>
  );
}

export default App;

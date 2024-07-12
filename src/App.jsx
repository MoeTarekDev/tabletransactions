import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Table from "./Components/Table/Table";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center my-[100px]">
        <Table />
      </div>
    </>
  );
}

export default App;

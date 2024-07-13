import "./App.css";
import Navigation from "./navigation/Navigation";
import { useState } from "react";
import TokenOperations from "./features/TokenOperations";

function App() {
  const [account, setAccount] = useState("");
  return (
    <>
      <Navigation account={account} setAccount={setAccount} />
      <TokenOperations account={account} />
    </>
  );
}

export default App;

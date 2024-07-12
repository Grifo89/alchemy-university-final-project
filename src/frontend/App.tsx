import "./App.css";
import { VStack } from "@chakra-ui/react";
import Navigation from "./Navigation";
import { useState } from "react";

function App() {
  const [account, setAccount] = useState("");
  return (
    <>
      <Navigation account={account} setAccount={setAccount} />
      <VStack justify="center"></VStack>
    </>
  );
}

export default App;

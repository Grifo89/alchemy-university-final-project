import {
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Center,
  Divider,
  useColorMode,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";
import TokenABI from "../../contracts/SimpleToken.json";
import TokenAddress from "../../contracts/SimpleToken-address.json";
import TransactionForm from "./TransactionForm";
import TransactionWithForm from "./TransactionWithBurnForm";

interface Props {
  account: string;
}

function TokenOperations({ account }: Props) {
  const [totalSupply, setTotalSupply] = useState("0");
  const [yourBalance, setYourBalance] = useState("0");
  const [provider, setProvider] = useState<any>();
  const [contract, setContract] = useState<any>();
  const [transferRunning, setTransferRunning] = useState<boolean>(false);
  const { colorMode } = useColorMode();
  // const [signer, setSigner] = useState<any>();

  const setupProvider = useCallback(async () => {
    if (window.ethereum == null) {
      alert("Metamask not installed");
    } else {
      let provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        TokenAddress.address,
        TokenABI.abi,
        provider
      );
      setContract(contract);
      setProvider(provider);
    }
  }, [provider, contract]);

  const getTotalSupply = useCallback(async () => {
    try {
      const response = await contract.totalSupply();
      setTotalSupply(ethers.formatEther(response));
    } catch (error) {
      console.error("Cannot get total supply", error);
    }
  }, [account]);

  const getYourBalance = useCallback(async () => {
    try {
      const response = await contract.balanceOf(account);
      setYourBalance(ethers.formatEther(response));
    } catch (error) {
      console.error("Cannot get your balance", error);
    }
  }, [account]);

  useEffect(() => {
    setupProvider();
    getTotalSupply();
    getYourBalance();
  }, [account, transferRunning]);

  return (
    <>
      <Flex marginTop={9}>
        <Stat>
          <StatLabel>Total Supply</StatLabel>
          <StatNumber>(AUS) {totalSupply}</StatNumber>
          <StatHelpText>Alchemy University Succed Token</StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Your Balance</StatLabel>
          <StatNumber>(AUS) {yourBalance}</StatNumber>
          <StatHelpText>Alchemy University Succed Token</StatHelpText>
        </Stat>
      </Flex>
      <Center marginTop={9}>
        <Divider
          size="md"
          borderColor={colorMode == "light" ? "blue.900 " : "teal.100"}
        />
      </Center>
      <Flex justifyContent={"space-around"}>
        <TransactionForm
          provider={provider}
          transferFlag={setTransferRunning}
        />
        <Center height="300px" marginTop={9}>
          <Divider
            orientation="vertical"
            borderColor={colorMode == "light" ? "blue.900 " : "teal.100"}
          />
        </Center>
        <TransactionWithForm
          provider={provider}
          transferFlag={setTransferRunning}
        />
      </Flex>
    </>
  );
}

export default TokenOperations;

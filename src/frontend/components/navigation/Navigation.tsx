import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { ethers } from "ethers";
import { ToggleColor } from "./ToggleColorMode";
import { useEffect } from "react";

interface Props {
  account: string;
  setAccount: (account: string) => void;
}

const Navigation = ({ account, setAccount }: Props) => {
  const connectHandler = async () => {
    if ("ethereum" in window) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = ethers.getAddress(accounts[0]);
      setAccount(account);
    } else {
      alert("Plug-in wallet not installed");
    }
  };

  const walletChange = async () => {
    window.ethereum.on("accountsChanged", async () => {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = ethers.getAddress(accounts[0]);
      setAccount(account);
    });
  };

  useEffect(() => {
    walletChange();
  }, []);

  return (
    <nav>
      <Flex marginBottom={3} justifyContent="space-between">
        <Box flex={1}>
          <ToggleColor />

          {account ? (
            <Flex justifyContent="space-between">
              <Text fontSize="lg" alignContent={"center"}>
                Wallet Connected ...{" "}
              </Text>
              <Button marginRight={35}>
                {account.slice(0, 6) + "..." + account.slice(38, 42)}
              </Button>
            </Flex>
          ) : (
            <Button margin={0} onClick={connectHandler}>
              Connect
            </Button>
          )}
        </Box>
      </Flex>
      <Heading>Alchemy University Succed Token (AUS)</Heading>
    </nav>
  );
};

export default Navigation;

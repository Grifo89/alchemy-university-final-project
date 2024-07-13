import { useForm, SubmitHandler } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  useColorMode,
  Box,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import TokenABI from "../../contracts/SimpleToken.json";
import TokenAddress from "../../contracts/SimpleToken-address.json";

type Inputs = {
  recipient: string;
  amount: number;
};

type Props = {
  provider: any;
  transferFlag: (flag: boolean) => void;
};

export default function TransactionForm({ provider, transferFlag }: Props) {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<Inputs>();

  const { colorMode } = useColorMode();
  const toast = useToast();

  const onSubmitTransfer: SubmitHandler<Inputs> = async ({
    recipient,
    amount,
  }) => {
    if (!window.ethereum) {
      toast({
        title: "Not Wallet Connected",
        status: "error",
        description: "You have to connect wallet first before transfer!",
        variant: "top-accent",
      });
    }

    if (!ethers.isAddress(recipient)) {
      toast({
        title: "Invalid Address",
        status: "error",
        description: "The recipient address for transfer is invalid!",
        variant: "top-accent",
      });
    }
    if (isNaN(amount)) {
      toast({
        title: "Invalid Amount",
        status: "error",
        description: "The amount for transfer is invalid!",
        variant: "top-accent",
      });
    }
    try {
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        TokenAddress.address,
        TokenABI.abi,
        signer
      );
      transferFlag(true);
      const tx = await contract.transfer(
        recipient,
        ethers.parseUnits(amount.toString(), "ether")
      );

      toast({
        title: "Transaction Submitted",
        status: "info",
        description: `Transaction Submitted! TxHash: ${tx.hash}`,
        variant: "top-accent",
      });
      await tx.wait();
      transferFlag(false);
      toast({
        title: "Transaction Succeeded",
        status: "info",
        description: `Transaction Succeeded! TxHash: ${tx.hash}`,
        variant: "top-accent",
      });
      resetField("amount");
      resetField("recipient");
    } catch (error) {
      transferFlag(false);
      toast({
        title: "Transaction Failed",
        status: "error",
        description: `Cannot perform transfer!`,
        variant: "top-accent",
      });
      console.error(error);
    }
  };

  // console.log(watch("recipient"));

  return (
    <Box marginTop={10} width={"md"}>
      <Heading marginBottom={9}>Transfer</Heading>
      <form onSubmit={handleSubmit(onSubmitTransfer)}>
        <FormControl isInvalid={!!errors.amount || !!errors.recipient}>
          <FormLabel htmlFor="name">Recipient Address</FormLabel>
          <Input
            id="recipient"
            placeholder="0xffffffffffffffffffffffffffffffffffffffff"
            borderColor={colorMode == "light" ? "blue.900 " : "teal.100"}
            {...register("recipient", {
              required: "This is required",
              pattern: /^(0x)[0-9a-fA-F]{40}$/,
              minLength: {
                value: 42,
                message: "Address should contain 0x + 40 Hex characters \n",
              },
              maxLength: 42,
            })}
          />
          <FormErrorMessage>
            {errors.recipient && errors.recipient.message}
          </FormErrorMessage>
          <FormLabel marginTop={6} htmlFor="name">
            Transfer Amount
          </FormLabel>
          <Input
            id="amount"
            placeholder="1"
            borderColor={colorMode == "light" ? "blue.900 " : "teal.100"}
            {...register("amount", {
              required: "This is required. Minimum amount 1 AUS",
              min: {
                value: 1,
                message: "Must be greater than or equal to 1",
              },
              max: {
                value: 1000000,
                message: "Must be less than 1000000",
              },
            })}
          />
          <FormErrorMessage>
            {errors.amount && errors.amount.message}
          </FormErrorMessage>
        </FormControl>
        <Button mt={10} type="submit">
          Submit Transfer
        </Button>
      </form>
    </Box>
  );
}

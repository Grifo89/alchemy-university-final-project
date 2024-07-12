import { Button, useColorMode } from "@chakra-ui/react";

export const ToggleColor = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button
      sx={{ position: "absolute", top: 8, right: 4 }}
      onClick={toggleColorMode}
      aria-label="Toggle Theme"
    >
      {colorMode === "dark" ? "☀️" : "🌜"}
    </Button>
  );
};

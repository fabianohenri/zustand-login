import React from "react";
import { Box, Button, Text, Stack, Center } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import "@/styles/style.css"

const DashboardPage: React.FC = () => {
  const user = useAuthStore((state) => state.name);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Center bg="gray.50" h="100vh">
      <Box
        color="black"
        maxW="md"
        mx="auto"
        mt="10"
        p="6"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
      >
        <Stack direction="row" h="20">
          <Text fontSize="lg" fontWeight="bold">
            Bem-vindo, {user}!
          </Text>
          <Text>Você está no Dashboard.</Text>
          <Button className="bt_cancel" onClick={handleLogout}>
            Sair
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};

export default DashboardPage;

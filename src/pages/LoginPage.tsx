import React, { useState } from "react";
import { Box, Button, Input, Stack, Text, Flex, Icon} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { toaster } from "@/components/ui/toaster";
import { Mail, Key } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = useAuthStore((state) => state.login); // Função para atualizar o Zustand
  const navigate = useNavigate();

  const thisLogging = async () => {
    // while (isLoading) {
    toaster.create({
      title: "Logando",
      description: "Validando credenciais",
      type: "loading",
    });
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toaster.create({
        description: "Por favor, preencha todos os campos.",
        duration: 3000,
        type: "error",
      });
      return;
    }

    try {
      setIsLoading(true);

      // Chama o logger em paralelo
      thisLogging();

      const response = await fetch("http://0.0.0.0:65500/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toaster.remove();
        toaster.create({
          title: "Sucesso",
          description: `Bem vindo ${data.name}`,
          duration: 3000,
          type: "success",
        });
        login({ email, name: data.name }); // Atualiza o estado do usuário autenticado
        navigate("/dashboard"); // Redireciona para o dashboard
      } else {
        toaster.remove();
        toaster.create({
          title: "Erro",
          description:
            data.message || "Credenciais inválidas. Tente novamente.",
          duration: 3000,
          type: "error",
        });
      }
    } catch (error) {
      toaster.remove();
      toaster.create({
        title: "Erro",
        description:
          "Erro ao se conectar ao servidor. Tente novamente mais tarde.",
        duration: 3000,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin(); // Chama a função de login quando a tecla Enter é pressionada
    }
  };

  return (
    <Flex className="login_background" direction="column" align="center" justify="center" minHeight="100vh">
      <Box className="login_container"  p={4} boxShadow="md" borderRadius="md" w="100%" maxW="400px">
        <Stack>
          <Text className="login-header">Login</Text>
          <hr className="hr_login" />
          
          <Flex direction="row" align="center" justify="space-around" mb={2}>
          <Mail size={24}/>
          <Input
            className="normal_imput_text"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />   
          </Flex>
          
          <Flex direction="row" align="center" justify="space-around" mb={2} >        
          <Key size={24}/> 
          <Input
            className="normal_imput_text"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            onKeyDown={handleKeyPress} // Adicionando o evento onKeyDown para detectar a tecla Enter
          />
          </Flex>
          
          <Button
            className="bt_singin"
            colorScheme="blue"
            onClick={handleLogin}
            {...{ isLoading }} // Passa dinamicamente para evitar erro de tipagem
          >
            Entrar
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
};

export default LoginPage;

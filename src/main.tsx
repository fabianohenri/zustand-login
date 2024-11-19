import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import {Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  
  <React.StrictMode>
    <ChakraProvider value={defaultSystem}>      
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <Toaster />
        <App />
      </ThemeProvider>
    </ChakraProvider>
  </React.StrictMode>
);

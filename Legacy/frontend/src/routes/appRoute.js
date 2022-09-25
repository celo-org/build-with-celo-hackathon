import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { render } from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import LegacyHome from "../pages/legacy-home";

const AppRoute = () => {

    const legacy = localStorage.getItem('has_legacy');
    
  return render(
    <BrowserRouter>
     <ChakraProvider theme={theme} resetCSS>
      <Routes>
        <Route index path="/" element={<LegacyHome />} />
      </Routes>
     </ChakraProvider>
    </BrowserRouter>,
    document.getElementById("root")
  );
};

export default AppRoute;

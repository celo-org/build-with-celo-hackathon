import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { render } from "react-dom";
import Home from "../pages/home";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import CheckInterval from "../pages/checkInterval";
import Form from "../pages/form";
import SelectTokens from "../pages/selectTokens";
import SuccessMessage from "../pages/successMsg";
import Edit from "../pages/edit";

const AppRoute = () => {

    const legacy = localStorage.getItem('has_legacy');
    
  return render(
    <BrowserRouter>
     <ChakraProvider theme={theme} resetCSS>
      <Routes>
        <Route index path="/" element={legacy ? <CheckInterval /> : <Home />} />
        <Route path="/get-started" element={<Form />} />
        <Route path="/select-token" element={<SelectTokens />} />
        <Route path="/profile" element={<CheckInterval />} />
        <Route path="/success" element={<SuccessMessage />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
     </ChakraProvider>
    </BrowserRouter>,
    document.getElementById("root")
  );
};

export default AppRoute;

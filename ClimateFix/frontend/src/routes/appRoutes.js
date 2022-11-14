import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { render } from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import LandingPage from "../pages/LandingPage";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Home from "../pages/Home";
import ExpertHome from "../pages/ExpertHome";
import PlantNow from "../pages/PlantNow";
import InvitePending from "../pages/InvitePending";
import UploadVideo from "../pages/UploadVideo";
import SuccessUpload from "../pages/SuccessfulUpload";
import AllExperts from "../pages/AllExperts";
import ForgotPassword from "../pages/ForgotPassword";
import ViewPlants from "../pages/ViewPlants";

const AppRoute = () => {

  return render(
    <BrowserRouter>
     <ChakraProvider theme={theme} resetCSS>
      <Routes>
        <Route index path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/expert-home" element={<ExpertHome />} />
        <Route path="/plant-now/:id" element={<PlantNow />} />
        <Route path="/invite-pending" element={<InvitePending />} />
        <Route path="/upload-video" element={<UploadVideo />} />
        <Route path="/success" element={<SuccessUpload />} />
        <Route path="/experts" element={<AllExperts />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/view-plants/:id" element={<ViewPlants />} />
      </Routes>
     </ChakraProvider>
    </BrowserRouter>,
    document.getElementById("root")
  );
};

export default AppRoute;

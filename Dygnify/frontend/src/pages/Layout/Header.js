import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Stack, Link } from "@mui/material";
import GradientButton from "../../tools/Button/GradientButton";
import {
  requestAccount,
  isConnected,
} from "../../components/navbar/NavBarHelper";
import PrimaryButton from "../../tools/Button/PrimaryButton";
import WalletWhiteSmall from "../SVGIcons/WalletWhiteSmall";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [status, setStatus] = useState(false);
  const location = useLocation();

  const fetchStatus = async () => {
    const getStatus = await isConnected();
    if (getStatus) return setStatus(true);
    setStatus(false);
  };

  async function hitRequestAccount() {
    await requestAccount(true);
    fetchStatus();
  }

  useEffect(() => {
    fetchStatus();
  }, [location]);

  return (
    <>
      <div
        style={{
          height: "76px",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          borderEndEndRadius: "12px",
          borderEndStartRadius: "12px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 40px",
        }}
      >
        <div>
          <img
            style={{ width: "150px", height: "80px", objectFit: "contain" }}
            src="/assets/logo.png"
            alt="company logo"
          />
        </div>

        {!status ? (
          <GradientButton onClick={hitRequestAccount}>
            Connect Wallet
          </GradientButton>
        ) : (
          <div
            style={{
              width: "170px",
              height: "50px",
              justifyContent: "center",
              alignItems: "center",

              borderRadius: "100px",
              borderWidth: 2,
              borderColor: "#9281FF",
              display: "flex",
              marginRight: -5,
            }}
            className="flex-row justify-center content-center items-center"
          >
            <WalletWhiteSmall />
            <div style={{ fontSize: "16px", fontWeight: "600", marginLeft: 5 }}>
              Connected
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;

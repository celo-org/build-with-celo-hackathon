import React from "react";
import { Trans } from "@lingui/macro";
import Footer from "../../components/Footer/Footer";
import "./Buy.css";
import TokenCard from "../../components/TokenCard/TokenCard";
import buyHLPIcon from "../../img/buy_gmx.svg";
import SEO from "../../components/Common/SEO";
import { getPageTitle } from "../../lib/legacy";

export default function BuyHLPTHLP() {
  return (
    <SEO title={getPageTitle("Buy THLP or HLP")}>
      <div className="BuyHLPTHLP page-layout">
        <div className="BuyHLPTHLP-container default-container">
          <div className="section-title-block">
            <div className="section-title-icon">
              <img src={buyHLPIcon} alt="buyHLPIcon" />
            </div>
            <div className="section-title-content">
              <div className="Page-title">
                <Trans>Buy HLP or THLP</Trans>
              </div>
            </div>
          </div>
          <TokenCard />
        </div>
        <Footer />
      </div>
    </SEO>
  );
}

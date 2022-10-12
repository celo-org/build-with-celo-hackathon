import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import GlpSwap from "../../components/Glp/GlpSwap";
import buyTHLPIcon from "../../img/ic_buy_glp.svg";
import Footer from "../../components/Footer/Footer";
import "./BuyGlp.css";

import { useChainId } from "../../lib/legacy";
import { getNativeToken } from "../../config/Tokens";

import { Trans } from "@lingui/macro";

export default function BuyGlp(props) {
  const { chainId } = useChainId();
  const history = useHistory();
  const [isBuying, setIsBuying] = useState(true);
  const nativeTokenSymbol = getNativeToken(chainId).symbol;

  useEffect(() => {
    const hash = history.location.hash.replace("#", "");
    const buying = hash === "redeem" ? false : true;
    setIsBuying(buying);
  }, [history.location.hash]);

  return (
    <div className="default-container page-layout">
      <div className="section-title-block">
        <div className="section-title-icon">
          <img src={buyTHLPIcon} alt="buyTHLPIcon" />
        </div>
        <div className="section-title-content">
          <div className="Page-title">
            <Trans>Buy / Sell THLP</Trans>
          </div>
          <div className="Page-description">
            <Trans>
              Purchase{" "}
              <a href="https://gmxio.gitbook.io/gmx/glp" target="_blank" rel="noopener noreferrer">
                THLP tokens
              </a>{" "}
              to earn {nativeTokenSymbol} fees from swaps and leverages trading.
            </Trans>
            <br />
            <Trans>Note that there is a minimum holding time of 15 minutes after a purchase.</Trans>
            <br />
            <Trans>
              View <Link to="/earn">staking</Link> page.
            </Trans>
          </div>
        </div>
      </div>
      <GlpSwap {...props} isBuying={isBuying} setIsBuying={setIsBuying} />
      <Footer />
    </div>
  );
}

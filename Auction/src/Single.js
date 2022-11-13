import { useState, useEffect } from "react";
import { Modal, Button, InputGroup, Form, Image } from "react-bootstrap";
import { formatBigNumber, truncateAddress } from "./util";
import { getTimeRemaining } from "./util/auction";

export default function Single({ show, handleClose, auction, bid, timeUp }) {
  const [input, setInput] = useState("");
  const [time, setTime] = useState("");
  const auctionActive = time === "0 minute0 seconds";
  const your =
    parseFloat(input ? input : 0) + parseFloat(formatBigNumber(auction.bid));
  const isSmaller =
    auction.highestBid > 0
      ? formatBigNumber(auction.highestBid) >= your
      : formatBigNumber(auction.startPrice) >= your;

  useEffect(() => {
    const timeFun = async () => {
      const t = await getTimeRemaining(auction.id);
      setTime(t);
    };
    timeFun();
    setTimeout(() => {
      timeFun();
    }, 60000);
  }, [auction]);
  return (
    <Modal show={show} size="lg" onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{auction.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Image src={auction.image} alt="My img" fluid />
        <p className="mt-2">{auction.description}</p>
        {/* <p> */}
        Highest Bid: <h5>{formatBigNumber(auction.highestBid)}cUSD</h5>
        {/* </p> */}
        Highest Bidder: <h5>{truncateAddress(auction.highestBidder)}</h5>{" "}
        Starting Bid: <h5>{formatBigNumber(auction.startPrice)}cUSD</h5>
        Your total bid: <h5>{formatBigNumber(auction.bid)}cUSD</h5>
        Auction ends in:{" "}
        <h5>
          {auctionActive
            ? "Auction ended (reward can only be claimed once)"
            : time}
        </h5>
        {auction.owner === window.contract.defaultAccount ? (
          <>
            <br />
            {auctionActive ? (
              <Button onClick={timeUp}>
                Claim your money ({formatBigNumber(auction.highestBid)}cUSD)
              </Button>
            ) : (
              "You can't bid in your own auction"
            )}
          </>
        ) : (
          <>
            {!auctionActive ? (
              <>
                <InputGroup className="mb-3">
                  <Form.Control
                    value={input}
                    type="number"
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Add more to your current bid to be the highest"
                  />
                  <InputGroup.Text>cUSD</InputGroup.Text>
                </InputGroup>
                <InputGroup className="mb-3">
                  <Form.Control
                    value={`Your total bid is ${your}cUSD (${
                      isSmaller ? "less" : "more"
                    } than the highest)`}
                    disabled
                    readOnly
                  />
                  <Button disabled={isSmaller} onClick={() => bid(input)}>
                    Bid
                  </Button>
                </InputGroup>
              </>
            ) : (
              <>
                Auction ended. Claim your reward <br />
                <Button onClick={timeUp}>
                  Claim your{" "}
                  {auction.highestBidder === window.contract.defaultAccount
                    ? "NFT(you deserve it)"
                    : "money(wasn't the highestBidder)"}{" "}
                </Button>
              </>
            )}
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

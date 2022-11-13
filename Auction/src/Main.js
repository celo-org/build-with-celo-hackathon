import { useState, useEffect, Fragment } from "react";
import {
  Button,
  Card,
  Row,
  Col,
  Container,
  InputGroup,
  Modal,
  Form,
  FloatingLabel,
  Spinner,
} from "react-bootstrap";
import Single from "./Single";
import { formatBigNumber, truncateAddress } from "./util";
import {
  createNft,
  getAuction,
  uploadToIpfs,
  bid,
  timeUp,
} from "./util/auction";

export default function Main({ performActions, contract }) {
  const [auctions, setAuctions] = useState([]);
  const [myAuctions, setMyAuctions] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    startPrice: "",
    ipfsImage: "",
    endAt: "",
  });
  const auc = () => {
    getAuction().then((res) => {
      if (!res) return;
      res.auctions && setAuctions(res.auctions);
      res.myAuctions && setMyAuctions(res.myAuctions);
    });
  };
  useEffect(() => {
    auc();
  }, [contract]);
  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });
  const [show, shouldShow] = useState(null);
  const [showMy, shouldShowMy] = useState(null);

  const isFormFilled = () => data.title && data.ipfsImage && data.description;
  return (
    <Container fluid="md">
      {window.contract ? (
        <Fragment>
          <Row>
            <Col md="10">
              <h1 className="mb-4">Ongoing Auctions</h1>
            </Col>
            <Col md="2" onClick={() => setAddModal(true)}>
              <i className="bi bi-plus-circle"></i>
            </Col>
          </Row>
          <Row>
            {auctions.length > 0 ? (
              auctions.map((auction, i) => {
                return (
                  <Col key={i} md="4" className="mb-3">
                    <Card style={{ width: "18rem" }}>
                      <Card.Header className="font-monospace text-secondary">
                        <Row>
                          <Col md="7">{truncateAddress(auction.owner)}</Col>
                          <Col md="5">
                            {parseFloat(formatBigNumber(auction.highestBid))}{" "}
                            cUSD
                          </Col>
                        </Row>
                      </Card.Header>
                      <Card.Img
                        variant="top"
                        src={auction.image.replace(
                          "ipfs.infura",
                          "diac.infura-ipfs"
                        )}
                      />
                      <Card.Body>
                        <Card.Title>{auction.title}</Card.Title>
                        <Card.Text>{auction.description}</Card.Text>
                        <Button onClick={() => shouldShow(i)}>
                          See Auction
                        </Button>
                        <Single
                          key={i}
                          show={show === i}
                          auction={auction}
                          handleClose={() => shouldShow(null)}
                          bid={(amount) =>
                            bid(performActions, auction.id, amount)
                          }
                          timeUp={() => timeUp(performActions, auction.id)}
                        />
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })
            ) : (
              <p>No ongoing auction currently. Try creating one above</p>
            )}
          </Row>
          <h1 className="mb-4">Auctions You Participated In</h1>
          <Row>
            {myAuctions.length > 0 ? (
              myAuctions.map((auction, i) => {
                return (
                  <Col key={i} md="4" className="mb-3">
                    <Card style={{ width: "18rem" }}>
                      <Card.Header className="font-monospace text-secondary">
                        <Row>
                          <Col md="7">{truncateAddress(auction.owner)}</Col>
                          <Col md="5">
                            {parseFloat(formatBigNumber(auction.highestBid))}{" "}
                            cUSD
                          </Col>
                        </Row>
                      </Card.Header>
                      <Card.Img
                        variant="top"
                        src={auction.image.replace(
                          "ipfs.infura",
                          "diac.infura-ipfs"
                        )}
                      />
                      <Card.Body>
                        <Card.Title>{auction.title}</Card.Title>
                        <Card.Text>{auction.description}</Card.Text>
                        <Button onClick={() => shouldShowMy(i)}>
                          See Auction
                        </Button>
                        <Single
                          key={i}
                          show={showMy === i}
                          auction={auction}
                          handleClose={() => shouldShowMy(null)}
                          timeUp={() => timeUp(performActions, auction.id)}
                        />
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })
            ) : (
              <p>
                You haven't participated in any auction yet. Try creating one
                above or participate in an existing one
              </p>
            )}
          </Row>
          <Modal show={addModal} size="lg" onHide={() => setAddModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>New Auction</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form>
                <FloatingLabel
                  controlId="inputLocation"
                  label="Title"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="title"
                    value={data.title}
                    placeholder="Title of NFT"
                    onChange={handleChange}
                  />
                </FloatingLabel>

                <FloatingLabel
                  controlId="inputDescription"
                  label="Description"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={data.description}
                    placeholder="description"
                    style={{ height: "80px" }}
                    onChange={handleChange}
                  />
                </FloatingLabel>

                <InputGroup className="mb-3">
                  <Form.Control
                    value={data.startPrice}
                    type="number"
                    name="startPrice"
                    onChange={handleChange}
                    placeholder="Starting Price(The minimum anyone can bid)"
                  />
                  <InputGroup.Text>cUSD</InputGroup.Text>
                </InputGroup>

                <FloatingLabel
                  controlId="inputEndAt"
                  label="Auction Ends At (in seconds)"
                  className="mb-3"
                >
                  <Form.Control
                    type="number"
                    name="endAt"
                    value={data.endAt}
                    placeholder="Auction ends at (in seconds)"
                    onChange={handleChange}
                  />
                </FloatingLabel>

                <Form.Control
                  type="file"
                  className={"mb-3"}
                  onChange={async (e) => {
                    const imageUrl = await uploadToIpfs(e);
                    if (!imageUrl) {
                      alert("failed to upload image");
                      return;
                    }
                    setData({ ...data, ipfsImage: imageUrl });
                  }}
                  placeholder="Product name"
                ></Form.Control>
              </Form>
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="outline-secondary"
                onClick={() => setAddModal(false)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                disabled={!isFormFilled()}
                onClick={() => {
                  setAddModal(false);
                  createNft(performActions, data).then((res) =>
                    window.location.reload()
                  );
                }}
              >
                Create Auction
              </Button>
            </Modal.Footer>
          </Modal>
        </Fragment>
      ) : (
        <div className="text-center mt-5">
          <Spinner animation="border" />
        </div>
      )}
    </Container>
  );
}

import { Button } from "react-bootstrap";

export default function Home({ connect }) {
  return (
    <div className="connect">
      <p>Connect Wallet to Celo Blockchain</p>
      <Button variant="primary" onClick={() => connect()}>
        Connect Wallet
      </Button>
    </div>
  );
}

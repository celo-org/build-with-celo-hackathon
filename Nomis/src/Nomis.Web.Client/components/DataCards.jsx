import * as Card from "./card";

export default function DataCards({ wallet, blockchain }) {
  return (
    <div className="DataCards">
      <h2>Hightlights</h2>
      <div className="grid">
        <Card.Score wallet={wallet} />
        <Card.Pulse wallet={wallet} blockchain={blockchain} />
        <Card.Age wallet={wallet} />
        <Card.Turnover wallet={wallet} />
      </div>
    </div>
  );
}

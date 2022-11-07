import Input from "../../components/global/Input";
import MainLayout from "../../layouts/Main";

export default function GetScore() {
  return (
    <MainLayout title="Get Yout Nomis Score">
      <div className="wrapper">
        <section className="GetScore">
          <div className="paragraph">
            <h1>Get Your Nomis Score</h1>
            <Input />
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

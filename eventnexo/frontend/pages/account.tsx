import React from "react";
import PrimaryButton from "../components/btn/PrimaryButton";
import AppLayout from "../components/layout/AppLayout";
import Meta from "../components/partials/Meta";

export default function Home() {
  return (
    <AppLayout>
      <Meta title="Account" />
      <div className="w-full max-w-8xl flex my-0 mx-auto">
        <div
          className="w-[250px] border-r-2 border-r-black sticky top-[78px] flex-shrink-[0] overflow-y-auto"
          style={{
            height: `calc(100vh - 78px)`,
            padding: `60px 60px 60px 60px`,
          }}
        >
          <div className="w-full mb-6">
            <div className="flex flex-col space-y-6">
              <PrimaryButton
                title="Account"
                onPressed={() => console.log("")}
              />
              <PrimaryButton title="My Ticket" onPressed={() => console.log("")} />
              <PrimaryButton title="My Event" onPressed={() => console.log("")} />
              <PrimaryButton
                title="Disconnet"
                onPressed={() => console.log("")}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between flex-1 pt-[60px]"></div>
      </div>
    </AppLayout>
  );
}

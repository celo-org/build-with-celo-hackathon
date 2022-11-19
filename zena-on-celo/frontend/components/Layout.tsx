import Nav from "./Nav";

export default function App({ children }: any) {
  return (
    <>
      <div className="min-h-full">
        <Nav isDashboard={true} />

        <main className="mt-12">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            {/* Replace with your content */}
            <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
              <div className="rounded-lg">{children}</div>
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
    </>
  );
}

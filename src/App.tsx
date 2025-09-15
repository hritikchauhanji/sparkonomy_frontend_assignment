import {
  Header,
  CreateInvoiceCard,
  Filters,
  Stats,
  IncomeTrendChart,
  InvoicesList,
  Footer,
} from "./components";

function App() {
  return (
    <div className="min-h-screen min-w-[390px] bg-gradient-to-b from-[var(--color-pink_light)] via-[var(--color-purple-g)] to-[var(--color-blue-g)]">
      <Header />
      <div className="flex flex-col justify-center items-center gap-3 bg-white rounded-t-[46px] p-6 shadow-lg mx-auto mt-16 md:bg-none md:max-w-4xl lg:max-w-5xl">
        <CreateInvoiceCard />
        <div className="text-primary text-[12px] p-[14px] text-center font-roboto ">
          Or Upload an existing invoice and set payment reminder
        </div>
        <Filters />
        <Stats />
        <IncomeTrendChart />
        <InvoicesList />
        <Footer />
      </div>
    </div>
  );
}

export default App;

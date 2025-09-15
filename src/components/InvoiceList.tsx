import { useState } from "react";
import { Pencil } from "lucide-react";

type InvoiceStatus =
  | "Update Status"
  | "Paid"
  | "Unpaid"
  | "Partially Paid"
  | "Awaited"
  | "Overdue"
  | "Draft"
  | "Disputed";

interface Invoice {
  id: number;
  clientName: string;
  amount: string;
  dueDate: string;
  status: InvoiceStatus;
}

const statusStyles: Record<InvoiceStatus, string> = {
  Paid: "bg-green_light text-green_dark",
  Unpaid: "bg-light_gray text-sparko-dark-gray",
  "Update Status": "bg-primary text-white",
  "Partially Paid": "bg-yellow_light text-yellow_dark",
  Awaited: "bg-yellow_light text-yellow_dark",
  Overdue: "bg-light_red text-pink_dark",
  Draft: "bg-light_gray text-sparko-dark-gray",
  Disputed: "bg-light_red text-pink_dark",
};

const ChevronDown = ({ open, color }: { open: boolean; color: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="8"
    height="8"
    viewBox="7 10 10 5"
    className={`transition-transform duration-200 ${
      open ? "rotate-0" : "rotate-180"
    }`}
    fill={color}
  >
    <path d="M7 10l5 5 5-5z" />
  </svg>
);

export const Bell = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#999999"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4 text-gray-500"
  >
    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const InvoiceList = () => {
  const [open, setOpen] = useState(true);

  const invoices: Invoice[] = [
    {
      id: 0,
      clientName: "Client Name",
      amount: "₹1,25,000",
      dueDate: "2024-06-15",
      status: "Update Status",
    },
    {
      id: 1,
      clientName: "Client Name",
      amount: "₹1,25,000",
      dueDate: "2024-06-15",
      status: "Unpaid",
    },
    {
      id: 2,
      clientName: "Income Trend",
      amount: "₹1,25,000",
      dueDate: "2024-06-15",
      status: "Disputed",
    },
    {
      id: 3,
      clientName: "Income Trend",
      amount: "₹1,25,000",
      dueDate: "2024-06-15",
      status: "Paid",
    },
    {
      id: 4,
      clientName: "Income Trend",
      amount: "₹1,25,000",
      dueDate: "2024-06-15",
      status: "Partially Paid",
    },
    {
      id: 5,
      clientName: "Income Trend",
      amount: "₹1,25,000",
      dueDate: "2024-06-15",
      status: "Overdue",
    },
    {
      id: 6,
      clientName: "Income Trend",
      amount: "₹1,25,000",
      dueDate: "2024-06-15",
      status: "Awaited",
    },
    {
      id: 7,
      clientName: "Income Trend",
      amount: "₹1,25,000",
      dueDate: "2024-06-15",
      status: "Draft",
    },
    {
      id: 8,
      clientName: "Income Trend",
      amount: "₹1,25,000",
      dueDate: "2024-06-15",
      status: "Paid",
    },
  ];

  return (
    <div className="mt-6 flex flex-col justify-center gap-2.5 bg-white rounded-2xl w-full">
      {/* Header */}
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <h2 className="text-[1rem] text-sparko-dark-gray font-roboto font-semibold">
          Your Invoices
        </h2>
        <ChevronDown open={open} color="#1F1F1F" />
      </div>

      {/* Invoice List */}
      {open && (
        <div className="flex flex-col justify-center gap-2.5">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="flex items-center justify-between px-3 py-4 border border-light_gray rounded-2xl"
            >
              <div className="flex flex-col justify-center gap-1">
                <p className="text-sm font-medium font-roboto text-gray_brand">
                  {invoice.clientName}
                </p>
                <p className="text-xs text-sparko-dark-gray font-roboto">
                  {invoice.amount}, Due: {invoice.dueDate}
                </p>
              </div>

              {/* Status */}
              <div className="flex items-center gap-2">
                {invoice.status === "Draft" ? (
                  <button className="flex justify-center items-center gap-3 ">
                    <div
                      className={`text-xs font-roboto font-medium rounded-3xl px-[15px] py-[9px] ${
                        statusStyles[invoice.status]
                      }`}
                    >
                      {invoice.status}
                    </div>
                    <Pencil className="w-[14px] h-[14px] text-sparko-dark-gray" />
                  </button>
                ) : invoice.status === "Awaited" ||
                  invoice.status === "Overdue" ? (
                  <button className="flex justify-center items-center gap-3 ">
                    <div
                      className={`text-xs font-roboto font-medium rounded-3xl px-[15px] py-[9px] ${
                        statusStyles[invoice.status]
                      }`}
                    >
                      {invoice.status}
                    </div>
                    <div>
                      {/* <Bell /> */}
                      <img src="/bell.png" alt="" />
                    </div>
                  </button>
                ) : invoice.status === "Update Status" ? (
                  <button
                    className={`flex justify-center items-center gap-[7.5px] text-xs font-roboto font-medium rounded-3xl px-[15px] py-[9px] ${
                      statusStyles[invoice.status]
                    }`}
                  >
                    {invoice.status}
                    <ChevronDown open={open} color={"#FFFFFF"} />
                  </button>
                ) : (
                  <button
                    className={`flex justify-center items-center gap-3 text-xs font-roboto font-medium rounded-3xl px-[15px] py-[9px] ${
                      statusStyles[invoice.status]
                    }`}
                  >
                    {invoice.status}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InvoiceList;

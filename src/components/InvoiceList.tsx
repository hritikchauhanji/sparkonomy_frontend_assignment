import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchInvoicesData,
  updateInvoiceStatus,
} from "../store/dashboardSlice";
import { Pencil } from "lucide-react";
import type { Invoice, InvoiceStatus } from "../types/dashboard";
import StatusDropdown from "./StatusDropdown";

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
  const dispatch = useAppDispatch();
  const invoices = useAppSelector((s) => s.dashboard.invoices) || [];
  const loading = useAppSelector((s) => s.dashboard.loading);
  const [open, setOpen] = useState(true);

  const invoiceStatuses: InvoiceStatus[] = [
    "Update Status",
    "Paid",
    "Unpaid",
    "Partially Paid",
    "Awaited",
    "Overdue",
    "Draft",
    "Disputed",
  ];

  useEffect(() => {
    dispatch(fetchInvoicesData({}));
  }, [dispatch]);

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
          {loading && (
            <p className="text-gray-500 text-sm">Loading invoices...</p>
          )}

          {!loading &&
            invoices.map((invoice: Invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between px-3 py-4 border border-light_gray rounded-2xl"
              >
                <div className="flex flex-col justify-center gap-1">
                  <p className="text-sm font-medium font-roboto text-gray_brand">
                    {invoice.clientName}
                  </p>
                  <p className="text-xs text-sparko-dark-gray font-roboto">
                    {invoice.amount.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                    , Due: {invoice.dueDate}
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
                      <img src="/bell.png" alt="notification" />
                    </button>
                  ) : invoice.status === "Update Status" ? (
                    <StatusDropdown
                      value={invoice.status}
                      options={invoiceStatuses}
                      onChange={(newStatus) => {
                        dispatch(
                          updateInvoiceStatus({
                            id: invoice.id,
                            status: newStatus,
                          })
                        );
                      }}
                    />
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

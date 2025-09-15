import { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { addInvoice } from "../store/dashboardSlice";
import type { Invoice } from "../types/dashboard";
import toast from "react-hot-toast";

export default function CreateInvoiceCard() {
  const dispatch = useAppDispatch();

  const [clientName, setClientName] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [showForm, setShowForm] = useState(false); // toggle form

  const handleCreate = () => {
    if (!clientName || !amount || !dueDate) {
      toast.error("Please fill all fields!");
      return;
    }

    const newInvoice: Invoice = {
      id: Date.now(),
      clientName,
      amount: parseFloat(amount),
      dueDate,
      status: "Draft",
    };

    dispatch(addInvoice(newInvoice));

    // reset form and close popup
    setClientName("");
    setAmount("");
    setDueDate("");
    setShowForm(false);
    toast.success("Invoice created successfully!");
  };

  return (
    <>
      {/* Card */}
      <div
        className="w-full h-[160px] bg-[#F2F2F2] rounded-[32px] flex flex-col items-center justify-center text-center shadow-sm gap-[14px] cursor-pointer"
        onClick={() => setShowForm(true)}
      >
        <div className="relative w-[50px] h-[50px] flex items-center justify-center">
          {/* Gradient border */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[var(--color-pink-g)] via-[var(--color-purple-g)] to-[var(--color-blue-g)]"></div>

          {/* Inner circle */}
          <div className="relative w-[42px] h-[42px] rounded-full bg-[#F8F8F8] flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="url(#gradientStroke)"
              strokeWidth="3"
            >
              <defs>
                <linearGradient id="gradientStroke" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#DD2A7B" />
                  <stop offset="50%" stopColor="#9747FF" />
                  <stop offset="100%" stopColor="#334CCA" />
                </linearGradient>
              </defs>
              <path
                strokeLinecap="square"
                strokeLinejoin="round"
                d="M12 5v14M5 12h14"
              />
            </svg>
          </div>
        </div>

        <div className="font-roboto text-2xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-b from-[var(--color-pink-g)] via-[var(--color-purple-g)] to-[var(--color-blue-g)]">
          Create New Invoice
        </div>
        <div className="text-sm font-normal text-gray-500 font-roboto">
          Start by creating and sending new invoice
        </div>
      </div>

      {/* Popup Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md flex flex-col gap-4 relative">
            <button
              className="absolute top-3 right-3 text-gray-400 font-bold text-xl"
              onClick={() => setShowForm(false)}
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold">Create Invoice</h2>
            <input
              type="text"
              placeholder="Client Name"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="px-3 py-2 rounded-md border border-gray-300 w-full"
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="px-3 py-2 rounded-md border border-gray-300 w-full"
            />
            <input
              type="date"
              placeholder="Due Date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="px-3 py-2 rounded-md border border-gray-300 w-full"
            />
            <button
              onClick={handleCreate}
              className="mt-2 px-4 py-2 font-roboto font-semibold rounded-lg bg-gradient-to-b from-pink-500 via-purple-500 to-blue-500 text-white"
            >
              Create Invoice
            </button>
          </div>
        </div>
      )}
    </>
  );
}

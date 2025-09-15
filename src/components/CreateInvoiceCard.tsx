export default function CreateInvoiceCard() {
  return (
    <div className="w-full h-[160px] bg-[#F2F2F2] rounded-[32px] flex flex-col items-center justify-center text-center shadow-sm gap-[14px]">
      <div className="relative w-[50px] h-[50px] flex items-center justify-center">
        {/* Gradient border */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[var(--color-pink-g)] via-[var(--color-purple-g)] to-[var(--color-blue-g)]"></div>

        {/* Inner circle smaller to reveal border */}
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

      {/* Title with gradient text */}
      <div className="font-roboto text-2xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-b from-[var(--color-pink-g)] via-[var(--color-purple-g)] to-[var(--color-blue-g)]">
        Create New Invoice
      </div>

      {/* Subtitle */}
      <div className="text-sm font-normal text-gray-500 font-roboto">
        Start by creating and sending new invoice
      </div>
    </div>
  );
}
